import axios from 'axios';
import dotenv from 'dotenv';
import { ERROR_CODE } from '../error-constants';
import sampleDataFetcher from '../scripts/generate-sample-data';

dotenv.config();

export interface IFetcherConstructor {
  username: string;
}

export interface IRetryDataType {
  query?: string;
  variables?: Record<string, string | null | number>;
}

export interface IRetryRequestInfo {
  url: string;
  method: 'GET' | 'POST';
  data?: IRetryDataType;
}

export enum BASE_API_URL {
  REST = 'https://api.github.com/users',
  GRAPHQL = 'https://api.github.com/graphql'
}

export default class Fetcher {
  private readonly repoFirstCount = 100; /** MAX Possible request **/
  private readonly REGISTERED_TOKEN = new Set<string>();
  private workOffline: boolean;

  constructor(private readonly props: IFetcherConstructor) {
    /**
     * Iterate env and check 'AUTH_TOKEN_###' for available token
     * Save all Token into set
     * */
    let index: number = 0;
    do {
      const tk = process.env[`AUTH_TOKEN_${++index}`];

      if (tk === void 0) break;

      this.REGISTERED_TOKEN.add(tk);
    } while (true);

    this.workOffline = process.env.MODE === 'offline';
  }

  private get repoGraphQLStructure(): string {
    return `
      repositories(first: ${this.repoFirstCount}, 
        ownerAffiliations: OWNER,
        orderBy: {direction: DESC, field: STARGAZERS},
        after: $AFTER) {
        
        totalCount
        nodes {
          name
          nameWithOwner
          description
          isPrivate
          isArchived
          isTemplate
          forkCount  
          stargazers {
            totalCount
          }
          languages(first: 100) {
            edges {
              node {
                name
                color
              }
              size
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    `;
  }

  private repoQuery(): string {
    /**
     * Will be use if the repository count is larger than expected
     * */

    /**
     * Requires
     *   $USERNAME
     *   $AFTER
     * */
    return `
      query userInfo($USERNAME: String!, $AFTER: String) {
        user(login: $USERNAME) {
          ${this.repoGraphQLStructure}
        }
      }
    `;
  }

  private statsQuery(): string {
    /**
     * Requires
     *   $USERNAME
     *   $AFTER
     * */

    /**
     * Will fetch contribution for past 370 days
     * */
    return `
      query userInfo($login: String!, $AFTER: String) {
        user(login: $login) {
          name
          id
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
          repositoriesContributedTo(
            first: 1, 
            contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
          }
          pullRequests(first: 1) {
            totalCount
          }
          openIssues: issues(states: OPEN) {
            totalCount
          }
          closedIssues: issues(states: CLOSED) {
            totalCount
          }
          followers {
            totalCount
          }
          ${this.repoGraphQLStructure}
        }
      }
    `;
  }

  private async *retry(reqInfo: IRetryRequestInfo) {
    const request = Object.assign({}, reqInfo, {
      headers: {
        Authorization: ``
      }
    });

    for (const token of this.REGISTERED_TOKEN.values()) {
      request.headers.Authorization = `bearer ${token}`;
      yield await axios(request.url, request).catch((e) => e);
    }
  }

  public async doFetchStats(): Promise<IGraphQLResponse> {
    let lastCursor: null | string = null;
    let hasNext: boolean = false;
    let repoCount: number = 0;
    let hasBeenSet: boolean = false;
    const records = {};
    const repos = [];

    if (this.workOffline) {
      return sampleDataFetcher.data<IGraphQLResponse>('stats');
    }

    do {
      const tries = await this.retry({
        url: BASE_API_URL.GRAPHQL,
        method: 'POST',
        data: {
          query: hasBeenSet ? this.repoQuery() : this.statsQuery(),
          variables: {
            login: this.props.username,
            AFTER: lastCursor
          }
        }
      });

      do {
        const tried = await tries.next();

        if (tried.done) {
          throw new Error(`${ERROR_CODE.OUT_OF_TOKEN}`);
        }

        const response = tried.value;
        const data = response?.data;

        if (response?.status !== 200 || typeof data === void 0) {
          // Considered Bad Token, Consumed or something I don't like
          continue;
        }

        /**
         * having a problem here?
         * Try to check the graphql query and validate it
         * before fucking up some codes here.
         * */
        try {
          if (
            typeof data !== void 0 &&
            typeof data.data !== void 0 &&
            typeof data.data.user !== void 0 &&
            'repositories' in data.data.user
          ) {
            lastCursor = data.data.user.repositories.pageInfo.endCursor as string;
            hasNext = data.data.user.repositories.pageInfo.hasNext;
            repoCount += data.data.user.repositories.totalCount;

            repos.push(...data.data.user.repositories.nodes);

            delete data.data.user['repositories'];
          }
          if (!hasBeenSet) Object.assign(records, data.data.user);
        } catch (err) {
          throw new TypeError(`${ERROR_CODE.QUERY_ERROR}`);
        }
        break;
      } while (true);

      hasBeenSet = true;
    } while (hasNext);

    return Object.assign(records, {
      repositories: repos,
      total: repoCount
    }) as IGraphQLResponse;
  }

  public async doFetchInfo(): Promise<IGithubRestApiUserInfo> {
    const request = {
      url: `${BASE_API_URL.REST}/${this.props.username}`,
      method: 'GET'
    } satisfies IRetryRequestInfo;

    if (this.workOffline) {
      return sampleDataFetcher.data<IGithubRestApiUserInfo>('info');
    }

    const retries = await this.retry(request);

    do {
      const tried = await retries.next();

      if (tried.done) {
        throw new Error(`${ERROR_CODE.OUT_OF_TOKEN}`);
      }

      const response = tried.value;
      const data = response?.data;

      if (response?.status !== 200 || typeof data === void 0) {
        // Considered Bad Token, Consumed or something I don't like
        continue;
      }

      return data as IGithubRestApiUserInfo;
    } while (true);
  }
}
