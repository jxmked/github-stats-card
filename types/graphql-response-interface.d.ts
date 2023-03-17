/**
 * Generated from
 *
 * https://app.quicktype.io/?l=ts
 *
 * */

interface IGraphQLResponse { /** Base **/
  name: string;
  id: string;
  contributionsCollection: ContributionsCollection;
  repositoriesContributedTo: ClosedIssues;
  pullRequests: ClosedIssues;
  openIssues: ClosedIssues;
  closedIssues: ClosedIssues;
  followers: ClosedIssues;
  repositories: Repository[];
  total: number;
}

interface IClosedIssues {
  totalCount: number;
}

interface IContributionsCollection {
  totalCommitContributions: number;
  restrictedContributionsCount: number;
  contributionCalendar: ContributionCalendar;
}

interface IContributionCalendar {
  weeks: Week[];
}

interface IWeek {
  contributionDays: ContributionDay[];
}

interface IContributionDay {
  contributionCount: number;
  date: Date;
}

interface IRepository {
  name: string;
  nameWithOwner: string;
  description: string;
  isPrivate: boolean;
  isArchived: boolean;
  isTemplate: boolean;
  forkCount: number;
  stargazers: ClosedIssues;
  languages: Languages;
}

interface ILanguages {
  edges: Edge[];
}

interface IEdge {
  node: Node;
  size: number;
}

interface INode {
  name: string;
  color: string;
}
