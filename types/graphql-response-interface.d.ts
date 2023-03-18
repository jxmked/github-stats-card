/**
 * Generated from
 *
 * https://app.quicktype.io/?l=ts
 *
 * */

interface IGraphQLResponse {
  /** Base **/ name: string;
  id: string;
  contributionsCollection: IContributionsCollection;
  repositoriesContributedTo: IClosedIssues;
  pullRequests: IClosedIssues;
  openIssues: IClosedIssues;
  closedIssues: IClosedIssues;
  followers: IClosedIssues;
  repositories: IRepository[];
  total: number;
}

interface IClosedIssues {
  totalCount: number;
}

interface IContributionsCollection {
  totalCommitContributions: number;
  restrictedContributionsCount: number;
  contributionCalendar: IContributionCalendar;
}

interface IContributionCalendar {
  weeks: IWeek[];
}

interface IWeek {
  contributionDays: IContributionDay[];
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
  stargazers: IClosedIssues;
  languages: ILanguages;
}

interface ILanguages {
  edges: IEdge[];
}

interface IEdge {
  node: INode;
  size: number;
}

interface INode {
  name: string;
  color: string;
}
