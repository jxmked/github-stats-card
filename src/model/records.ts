import Fetcher from './fetcher';




export default class Records {
  
  protected ff: Fetcher;
  
  constructor(username:string) {
    this.ff = new Fetcher({username});
  }
  
  isValidAccount(): boolean {
    
  }
}
