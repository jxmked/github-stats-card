
import { Request, Response } from 'express';
import Template from 'lodash/template.js';
import { bottom } from './templates/starship-avalon';
import { optimize } from 'svgo';
import Fetcher from '../data-fetcher/fetcher';
import numeral from 'numeral';

export default class Bottom  {
  private parsed: ReturnType<typeof Template>;
  private userid: number;
   
  constructor() {
    this.parsed = Template(bottom);
    this.userid = 0;
  }
  
  
  async validateAccount(fetcher:Fetcher): Promise<boolean>{
    try {
      const data = await fetcher.doFetchInfo();
      
      this.userid = data.id;
      
      /**
       * We can also block or restrict other user if needed
       * */
      return data.type === 'User';
    } catch(err) {}
    
    return false;
  }
  
  
  
  
  formatNum(value:number):string {
    const knum = numeral(value).format("0.0a");
    
    return knum.replace(/(?=)/i, "")
  }
  
  insertTrailing(label:string, count:string, trail:string="-", charSpace:number=36): string {
    const labelLen = label.length;
    const countLen = count.length;
    
    return `${label} ${trail.repeat(charSpace - (labelLen + countLen + 2))} ${count}`
  }
  
  async generateStats(fetcher:Fetcher) {
    const data = await fetcher.doFetchStats();
    
    const pos = {
      x: 165,
      y: 260 /** Initial | Max 460 **/
    }
    const spacing = 50;
    const parsed = Template(`<text x="<%= X %>" y="<%= Y %>" fill="rgb(174, 174, 178)" font-size="35" font-weight="bold" font-family="monospace" text-anchor="start"><%= CONTENT %></text>`)

    
    const tIssues = this.formatNum(data.openIssues.totalCount + data.closedIssues.totalCount);
    let starsCount = 0;
    data.repositories.map((repo:IRepository) => starsCount += repo.stargazers.totalCount);
  
    const tStars = this.formatNum(starsCount)
    const tPRs = this.formatNum(data.pullRequests.totalCount)
    const tCont = this.formatNum(data.repositoriesContributedTo.totalCount)
    const tComm = this.formatNum(
      data.contributionsCollection.totalCommitContributions + 
      data.contributionsCollection.restrictedContributionsCount)
    
    const stats = {
      "Stars Earned": tStars,
      "Total Commits": tComm,
      "Pull Request": tPRs,
      "Issues": tIssues,
      "Contributes (last year)": tCont
    }
    
    return Object.entries(stats).map(([k, v], index) => {
      return parsed({
        X: pos.x,
        Y: pos.y + ((index) * spacing),
        CONTENT: this.insertTrailing(k, v)
      })
    })
    
  }
  
  
  
  async handle(req: Request, res:Response): Promise<void>{
    const { username } = req.params;
    
    
    const fObject = new Fetcher({username})
    
    const isValidAccount = await this.validateAccount(fObject);

    if(!isValidAccount) {
      res.send("Invalid account");
      return;
    }
    
    const statsData = await this.generateStats(fObject)
    
    const cacheSeconds = 60 * 60 * 12; // 12 hours in seconds
    const staleWhileRevalidateSeconds = 60 * 60 * 24; // 1 day in seconds
    
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader(
      "Cache-Control",
      `max-age=${cacheSeconds}, s-maxage=${cacheSeconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`
    );
    
    const compiled = this.parsed({
      USERNAME: username,
      CARD_INFO: 'USR_STATS',
      USER_ID: String(this.userid),
      RANK: 'S++',
      CHART_FULL_GRAPH: '7K',
      CHART_HALF_GRAPH: '3.5k',
      CHART_RECORD_HITS: '288',
      CORE_PANEL_A: 'style="animation: Anim 3s linear infinite 0s"',
      CORE_PANEL_B: 'class="corefailed"',
      CORE_PANEL_C: 'class="corefailed"',
      CORE_PANEL_D: 'class="corefailed"',
      CORE_PANEL_E: 'class="corefailed"',
      CORE_PANEL_F: 'class="corefailed"',
      CORE_PANEL_G: 'class="corefailed"',
      CORE_PANEL_H: 'class="corefailed"',
      STATS_RECORD: statsData.join("")
    })
    
    res.send(optimize(compiled).data)
    
  }
}

