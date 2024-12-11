import { Octokit } from "@octokit/rest";

/**
 * GitHub service for API interactions.
 */
export class GitHubService {
  private octokit: Octokit;

  constructor(authToken: string) {
    this.octokit = new Octokit({ auth: authToken });
  }

  /**
   * Add a label to an issue or pull request.
   */
  async addLabel(owner: string, repo: string, issueNumber: number, labels: string[]): Promise<void> {
    await this.octokit.issues.addLabels({
      owner,
      repo,
      issue_number: issueNumber,
      labels,
    });
  }

  /**
   * Create a comment on an issue or pull request.
   */
  async createComment(owner: string, repo: string, issueNumber: number, body: string): Promise<void> {
    await this.octokit.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body,
    });
  }

  /**
   * Request reviewers for a pull request.
   */
  async requestReviewers(
    owner: string,
    repo: string,
    pullNumber: number,
    reviewers: string[]
  ): Promise<void> {
    await this.octokit.pulls.requestReviewers({
      owner,
      repo,
      pull_number: pullNumber,
      reviewers,
    });
  }
}
