import { GitHubService } from "./githubService";
import { NOTIFICATIONS } from "../utils/constants";

/**
 * Service for sending notifications to users.
 */
export class NotifyService {
  private githubService: GitHubService;

  constructor(githubService: GitHubService) {
    this.githubService = githubService;
  }

  /**
   * Send a welcome notification for an issue.
   */
  async sendIssueWelcome(
    owner: string,
    repo: string,
    issueNumber: number,
    user: string
  ): Promise<void> {
    const message = `@${user}, ${NOTIFICATIONS.ISSUE_WELCOME}`;
    await this.githubService.createComment(owner, repo, issueNumber, message);
  }

  /**
   * Send a congratulations notification for a merged pull request.
   */
  async sendPRMergedCongrats(
    owner: string,
    repo: string,
    pullNumber: number,
    user: string
  ): Promise<void> {
    const message = `🎉 @${user}, ${NOTIFICATIONS.PR_MERGED}`;
    await this.githubService.createComment(owner, repo, pullNumber, message);
  }
}
