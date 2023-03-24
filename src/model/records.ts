import Fetcher from './fetcher';

/**
 * After account validation,
 * user info, stats, and other required data
 * will be stored here and will be set as READONLY
 *
 * During rendering, options from url will be parse and analyze
 * to return the expected result
 *
 * */

export class UserBlocked extends Error {}
export class MissingData extends Error {}

export default class Records {
  protected ff: Fetcher;
  protected level1Data: IGithubRestApiUserInfo | undefined;
  protected level2Data: IGraphQLResponse | undefined;

  constructor(username: string) {
    this.ff = new Fetcher({ username });
  }

  /**
   * The beginLevel1Fetch method should be call first before
   * Other fetchers. Needed to validate user account or username
   * before doing deeper level fetch to prevent any errors
   *
   *
   * */
  async beginLevel1Fetch(): Promise<void> {
    if (typeof this.level1Data !== void 0) {
      return;
    }
    this.level1Data = await this.ff.doFetchInfo();
  }

  async beginLevel2Fetch(): Promise<void> {
    if (typeof this.level2Data !== void 0) {
      return;
    }

    this.level2Data = await this.ff.doFetchStats();
  }

  isBlocked(): boolean {
    /**
     * Will be implemented soon
     * */
    return false;
  }

  isValidAccount(): boolean {
    /**
     * Check if account is type == user and
     * not blocked from accessing api
     *
     * */
    if (this.isBlocked()) {
      throw new UserBlocked('User is blocked');
    }

    if (this.level1Data === void 0 || !('type' in this.level1Data)) {
      throw new MissingData('Records.beginLevel1Fetch needed to be fetch first');
    }

    if (String(this.level1Data.type).toLowerCase() !== 'user') {
      return false;
    }

    return true;
  }
}
