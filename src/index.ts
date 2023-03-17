import axios from 'axios';
import dotenv from 'dotenv';
import moment from 'moment';
dotenv.config();

import Fetcher from './data-fetcher/fetcher';

const graphqlQuery = (uname: string, from: string, to: string) => {
  return {
    query: `
              query userInfo($LOGIN: String!, $after: String) {
                user(login: $LOGIN) {
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
                  repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
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
                  repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}, after: $after) {
                    totalCount
                    nodes {
                      name
                      nameWithOwner
                      isPrivate
                      isArchived
                      isTemplate
                      stargazers {
                        totalCount
                      }
                      description
                      languages(first: 100) {
                        edges {
                          node {
                            name
                            color
                          }
                          size
                        }
                      }
                      forkCount   
                    }
                    pageInfo {
                      hasNextPage
                      endCursor
                    }
                  }
                }
              }
            `,
    variables: {
      LOGIN: uname,
      FROM: from,
      TO: to,
      after: null
    }
  };
};

const func = async () => {
  const today = new Date();
  const now = moment();
  const from = moment(now).subtract(30, 'days').utc().toISOString();
  // also include the next day in case our server is behind in time with respect to GitHub
  const to = moment(now).add(1, 'days').utc().toISOString();
  console.log(from, to);

  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const dateRange = `${thirtyDaysAgo.toISOString()}..${today.toISOString()}`;

  const res = await axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    headers: {
      Authorization: `bearer ${process.env.AUTH_TOKEN_1}`
    },
    data: graphqlQuery('adamgiebl', from, to)
  });

  console.log(JSON.stringify(res.data, null, 2));
};

const ff = new Fetcher({
  username: 'jxmked'
});

ff.doFetchStats()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log('err');
  });

export {};
