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
 
export default class Records {
  protected ff: Fetcher;

  constructor(username: string) {
    this.ff = new Fetcher({ username });
  }

  isValidAccount(): boolean {}
}
