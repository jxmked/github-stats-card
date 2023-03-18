import { Request, Response } from 'express';
import Template from 'lodash/template.js';
import { bottom } from './templates/starship-avalon';
import { optimize } from 'svgo';
import Fetcher from '../data-fetcher/fetcher';
import numeral from 'numeral';

export default class Bottom {
  private parsed: ReturnType<typeof Template>;
  private userid: number;

  constructor() {
    this.parsed = Template(bottom);
    this.userid = 0;
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

  formatNum(value: number): string {
    return numeral(value).format('0.0a').replace(/\.0/, '');
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

  generateGraph(data: IGraphQLResponse) {
    /**
     * Graph Range | x y
     * 245 720  -> 920 555
     * */
    const graph = {
      sx: 245,
      sy: 720,
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

    const highestCommit = Math.max(...commitPerDays);
    const xDiff = graph.width / commitPerDays.length;
    const scale = graph.height / highestCommit;
    const graphData = commitPerDays
      .map((num: number, count: number) => {
        count = count + 1;
        const attr = count === 1 ? 'M' : 'L';
        return `${attr} ${(graph.sx + xDiff * count).toFixed(2)} ${(
          graph.sy +
          num * scale
        ).toFixed(2)}`;
      })
      .join(' ');
    console.log(graphData);
    return {
      graph: graphData,
      maxCommit: highestCommit,
      midCommit: highestCommit / 2,
      recordLength: commitPerDays.length
    } as { graph: string; maxCommit: number; midCommit: number; recordLength: number };
  }

  generateStats(data: IGraphQLResponse) {
    const pos = {
      x: 165,
      y: 260 /** Initial | Max 460 **/
    };
    const spacing = 50;
    const parsed = Template(
      `<text x="<%= X %>" y="<%= Y %>" fill="rgb(174, 174, 178)" font-size="35" font-weight="bold" font-family="monospace" text-anchor="start"><%= CONTENT %></text>`
    );

    const tIssues = this.formatNum(
      data.openIssues.totalCount + data.closedIssues.totalCount
    );
    let starsCount = 0;
    data.repositories.map(
      (repo: IRepository) => (starsCount += repo.stargazers.totalCount)
    );

    const tStars = this.formatNum(starsCount);
    const tPRs = this.formatNum(data.pullRequests.totalCount);
    const tCont = this.formatNum(data.repositoriesContributedTo.totalCount);
    const tComm = this.formatNum(
      data.contributionsCollection.totalCommitContributions +
        data.contributionsCollection.restrictedContributionsCount
    );

    const stats = {
      'Stars Earned': tStars,
      'Total Commits': tComm,
      'Pull Request': tPRs,
      'Issues': tIssues,
      'Contributes (last year)': tCont
    };

    return Object.entries(stats).map(([k, v], index) => {
      return parsed({
        X: pos.x,
        Y: pos.y + index * spacing,
        CONTENT: this.insertTrailing(k, v)
      });
    });
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    const fObject = new Fetcher({ username });

    const isValidAccount = await this.validateAccount(fObject);

    if (!isValidAccount) {
      res.send('Invalid account');
      return;
    }

    const data = await fObject.doFetchStats();

    const statsData = this.generateStats(data);
    const graphData = this.generateGraph(data);

    const cacheSeconds = 60 * 60 * 12; // 12 hours in seconds
    const staleWhileRevalidateSeconds = 60 * 60 * 24; // 1 day in seconds

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader(
      'Cache-Control',
      `max-age=${cacheSeconds}, s-maxage=${cacheSeconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`
    );

    const compiled = this.parsed({
      USERNAME: username,
      CARD_INFO: 'USR_STATS',
      USER_ID: String(this.userid),
      RANK: 'S++',
      CHART_FULL_GRAPH: this.formatNum(graphData.maxCommit),
      CHART_HALF_GRAPH: this.formatNum(graphData.midCommit),
      CHART_RECORD_HITS: graphData.recordLength,
      CORE_PANEL_A: 'style="animation: Anim 3s linear infinite 0s"',
      CORE_PANEL_B: 'class="corefailed"',
      CORE_PANEL_C: 'class="corefailed"',
      CORE_PANEL_D: 'class="corefailed"',
      CORE_PANEL_E: 'class="corefailed"',
      CORE_PANEL_F: 'class="corefailed"',
      CORE_PANEL_G: 'class="corefailed"',
      CORE_PANEL_H: 'class="corefailed"',
      STATS_RECORD: statsData.join(''),
      GRAPH_DATA: graphData.graph
    });

    res.send(optimize(compiled).data)
  }
}
