import { Request, Response } from 'express';
import Template from 'lodash/template.js';
import { bottom, Error_Banner } from './templates/starship-avalon';
import { optimize } from 'svgo';
import Fetcher from '../model/fetcher';
import { calculateRank, IRankParams, formatNumber } from '../utils';
import { BaseError } from './templates/svgs';

export default class Bottom {
  private parsed: ReturnType<typeof Template>;
  private userid: number;
  private generatedStats: IRankParams;
  private isDev: boolean;

  constructor() {
    this.parsed = Template(bottom);
    this.userid = 0;

    this.generatedStats = {
      totalRepos: 0,
      totalCommits: 0,
      contributions: 0,
      followers: 0,
      prs: 0,
      issues: 0,
      stargazers: 0
    };
    
    
    this.isDev = process.env.NODE_ENV === 'development';
  }

  async validateAccount(fetcher: Fetcher): Promise<boolean> {
    try {
      const data = await fetcher.doFetchInfo();

      this.userid = data.id;

      /**
       * We can also block or restrict other user if needed
       * */
      return data.type === 'User';
    } catch (err) {}

    return false;
  }

  insertTrailing(
    label: string,
    count: string,
    trail: string = '-',
    charSpace: number = 36
  ): string {
    const labelLen = label.length;
    const countLen = count.length;

    return `${label} ${trail.repeat(charSpace - (labelLen + countLen + 2))} ${count}`;
  }

  populateStats(stats: { [key: string]: string }) {
    const pos = {
      x: 165,
      y: 260 /** Initial | Max 460 **/
    };
    const spacing = 50;
    const parsed = Template(
      `<text 
        x="<%= X %>" y="<%= Y %>" 
        fill="rgb(174, 174, 178)" 
        font-size="35" 
        font-weight="bold" 
        font-family="monospace" 
        text-anchor="start"><%= CONTENT %></text>`
    );

    return Object.entries(stats).map(([k, v], index): string => {
      return parsed({
        X: pos.x,
        Y: pos.y + index * spacing,
        CONTENT: this.insertTrailing(k, v)
      });
    });
  }

  errorCard(req: Request, res: Response): void {
    const { username } = req.params;

    /**
     * Hahaha
     * */
    const statsData = this.populateStats({
      E_RECORD_RET_NULL: 'Critical',
      E_FETCH_RET_NULL: 'Fail',
      E_GENERATE_NULL: 'Fail'
    });

    const animStyle = Template(
      'style="animation: Anim <%= interval %>s linear infinite <%= delay %>s"'
    );
    const rand = (x: number, y: number) => {
      return {
        interval: Math.ceil(Math.random() * x),
        delay: Math.ceil(Math.random() * y)
      };
    };

    const compiled = this.parsed({
      USERNAME: username,
      CARD_INFO: 'DIAG_SYS',
      USER_ID: 'Error',
      RANK: 'Error',
      CHART_FULL_GRAPH: 'Err',
      CHART_HALF_GRAPH: 'Err',
      CHART_RECORD_HITS: 'Err',
      CORE_PANEL_A: animStyle(rand(4, 2)),
      CORE_PANEL_B: animStyle(rand(2, 3)),
      CORE_PANEL_C: animStyle(rand(3, 1)),
      CORE_PANEL_D: animStyle(rand(4, 3)),
      CORE_PANEL_E: animStyle(rand(5, 3)),
      CORE_PANEL_F: animStyle(rand(4, 5)),
      CORE_PANEL_G: animStyle(rand(6, 2)),
      CORE_PANEL_H: animStyle(rand(2, 3)),
      STATS_RECORD: statsData.join(''),
      GRAPH_DATA: 'M0 0H720',
      AFTER_CONTENT: Template(Error_Banner)({
        ERROR_CONTENT: 'INVALID REQUEST'
      })
    });

    try {
      res.send(optimize(compiled).data);
    } catch (err) {
      res.send(BaseError);
    }
  }

  generateGraph(data: IGraphQLResponse) {
    /**
     * Graph Range | x y
     * 245 720  -> 920 555
     * */
    const graph = {
      sx: 245,
      sy: 715,
      dx: 920,
      dy: 555,
      width: 0,
      height: 0
    };

    graph.width = graph.dx - graph.sx;
    graph.height = graph.dy - graph.sy;

    /** Extract Record **/
    const records = data.contributionsCollection.contributionCalendar.weeks;

    /**
     * past -> present
     * */
    const commitPerDays: number[] = [];

    for (const { contributionDays } of records) {
      for (const { contributionCount } of contributionDays) {
        commitPerDays.push(contributionCount);
      }
    }

    let highestCommit: number = Math.max(...commitPerDays);
    let graphData: string = 'M0 0h720';
    /**
     * Rouding up
     * */
    if (highestCommit !== 0) {
      highestCommit = Math.ceil(highestCommit / 10) * 10;

      const xDiff = graph.width / commitPerDays.length;
      const scale = graph.height / highestCommit;
      graphData = commitPerDays
        .map((num: number, count: number) => {
          const attr = count === 0 ? 'M' : 'L';
          return `${attr} ${(graph.sx + xDiff * count).toFixed(2)} ${(
            graph.sy +
            num * scale
          ).toFixed(2)}`;
        })
        .join(' ');
    }

    return {
      graph: graphData,
      maxCommit: highestCommit,
      midCommit: highestCommit / 2,
      recordLength: commitPerDays.length
    };
  }

  generateStats(data: IGraphQLResponse) {
    const tIssues = data.openIssues.totalCount + data.closedIssues.totalCount;

    let starsCount = 0;
    data.repositories.map(
      (repo: IRepository) => (starsCount += repo.stargazers.totalCount)
    );

    const tStars = starsCount;
    const tPRs = data.pullRequests.totalCount;
    const tCont = data.repositoriesContributedTo.totalCount;
    const tComm =
      data.contributionsCollection.totalCommitContributions +
      data.contributionsCollection.restrictedContributionsCount;

    this.generatedStats.totalRepos = data.total;
    this.generatedStats.stargazers = tStars;
    this.generatedStats.prs = tPRs;
    this.generatedStats.issues = tIssues;
    this.generatedStats.contributions = tCont;
    this.generatedStats.totalCommits = tComm;
    this.generatedStats.followers = data.followers.totalCount;

    const stats = {
      'Stars Earned': formatNumber(tStars),
      'Total Commits': formatNumber(tComm),
      'Pull Request': formatNumber(tPRs),
      'Issues': formatNumber(tIssues),
      'Contributes (last year)': formatNumber(tCont)
    };

    return this.populateStats(stats);
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    const fObject = new Fetcher({ username });
    const isValidAccount = await this.validateAccount(fObject);

    const cacheSeconds = this.isDev ? 0 : 60 * 60 * 12; // 12 hours in seconds
    const staleWhileRevalidateSeconds = this.isDev ? 0 : 60 * 60 * 24; // 1 day in seconds

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader(
      'Cache-Control',
      `max-age=${cacheSeconds},${' '}s-maxage=${cacheSeconds},${''}stale-while-revalidate=${staleWhileRevalidateSeconds}`
    );

    if (!isValidAccount) {
      this.errorCard(req, res);
      return;
    }

    const data = await fObject.doFetchStats();

    const statsData = this.generateStats(data);
    const graphData = this.generateGraph(data);

    const compiled = this.parsed({
      USERNAME: username,
      CARD_INFO: 'USR_STATS',
      USER_ID: String(this.userid),
      RANK: calculateRank(this.generatedStats).level,
      CHART_FULL_GRAPH: formatNumber(graphData.maxCommit),
      CHART_HALF_GRAPH: formatNumber(graphData.midCommit),
      CHART_RECORD_HITS: graphData.recordLength,
      CORE_PANEL_A: '',
      CORE_PANEL_B: '',
      CORE_PANEL_C: '',
      CORE_PANEL_D: '',
      CORE_PANEL_E: '',
      CORE_PANEL_F: '',
      CORE_PANEL_G: '',
      CORE_PANEL_H: '',
      STATS_RECORD: statsData.join(''),
      GRAPH_DATA: graphData.graph,
      AFTER_CONTENT: ''
    });

    try {
      res.send(optimize(compiled).data);
    } catch (err) {
      res.send(BaseError);
    }
  }
}
