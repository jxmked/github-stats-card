/**
 * Calculates the probability of x taking on x or a value less than x in a normal distribution
 * with mean and standard deviation.
 *
 * @see https://stackoverflow.com/a/5263759/10629172
 *
 * @param {string} mean The mean of the normal distribution.
 * @param {number} sigma The standard deviation of the normal distribution.
 * @param {number} to The value to calculate the probability for.
 * @returns {number} Probability.
 */
export const normalcdf = (mean: number, sigma: number, to: number): number => {
  const z = (to - mean) / Math.sqrt(2 * sigma * sigma);
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  const sign = z < 0 ? -1 : 1;
  return 0.5 * (1 + sign * erf);
};

/**
 * Calculates the users rank.
 *
 * @param {number} totalRepos Total number of repos.
 * @param {number} totalCommits Total number of commits.
 * @param {number} contributions The number of contributions.
 * @param {number} followers The number of followers.
 * @param {number} prs The number of pull requests.
 * @param {number} issues The number of issues.
 * @param {number} stargazers The number of stars.
 * @returns {{level: string, score: number}}} The users rank.
 */
export interface IRankParams {
  totalRepos: number;
  totalCommits: number;
  contributions: number;
  followers: number;
  prs: number;
  issues: number;
  stargazers: number;
}

export interface IRankResult {
  level: string;
  score: number;
}

export const calculateRank = ({
  totalRepos,
  totalCommits,
  contributions,
  followers,
  prs,
  issues,
  stargazers
}: IRankParams): IRankResult => {
  const COMMITS_OFFSET = 1.65;
  const CONTRIBS_OFFSET = 1.65;
  const ISSUES_OFFSET = 1;
  const STARS_OFFSET = 0.75;
  const PRS_OFFSET = 0.5;
  const FOLLOWERS_OFFSET = 0.45;
  const REPO_OFFSET = 1;

  const ALL_OFFSETS =
    CONTRIBS_OFFSET +
    ISSUES_OFFSET +
    STARS_OFFSET +
    PRS_OFFSET +
    FOLLOWERS_OFFSET +
    REPO_OFFSET;

  const RANK_S_VALUE = 1;
  const RANK_DOUBLE_A_VALUE = 25;
  const RANK_A2_VALUE = 45;
  const RANK_A3_VALUE = 60;
  const RANK_B_VALUE = 100;

  const TOTAL_VALUES =
    RANK_S_VALUE + RANK_DOUBLE_A_VALUE + RANK_A2_VALUE + RANK_A3_VALUE + RANK_B_VALUE;

  const score =
    (totalCommits * COMMITS_OFFSET +
      contributions * CONTRIBS_OFFSET +
      issues * ISSUES_OFFSET +
      stargazers * STARS_OFFSET +
      prs * PRS_OFFSET +
      followers * FOLLOWERS_OFFSET +
      totalRepos * REPO_OFFSET) /
    100;

  const normalizedScore = normalcdf(score, TOTAL_VALUES, ALL_OFFSETS) * 100;

  const level =
    normalizedScore < RANK_S_VALUE
      ? 'S+'
      : normalizedScore < RANK_DOUBLE_A_VALUE
      ? 'S'
      : normalizedScore < RANK_A2_VALUE
      ? 'A++'
      : normalizedScore < RANK_A3_VALUE
      ? 'A+'
      : 'B+';

  return { level, score: normalizedScore };
};
