import { Context } from "probot";

/**
 * Handles all GitHub pull request events.
 * @param context - The Probot context object for the event.
 */
export const handlePullRequests = async (context: Context): Promise<void> => {
  const { action, pull_request, repository } = context.payload;

  try {
    // Log the incoming event
    context.log.info(`Handling pull request event: ${action}`);

    // Event: Pull Request Opened
    if (action === "opened") {
      await handlePROpened(context);
    }

    // Event: Pull Request Merged
    if (action === "closed" && pull_request.merged) {
      await handlePRMerged(context);
    }

    // Event: Pull Request Ready for Review
    if (action === "ready_for_review") {
      await handlePRReadyForReview(context);
    }
  } catch (error) {
    context.log.error(`Error handling pull request event: ${error}`);
  }
};

/**
 * Handles the "opened" action for pull requests.
 * @param context - The Probot context object for the event.
 */
const handlePROpened = async (context: Context): Promise<void> => {
  const pullRequest = context.payload.pull_request;
  const repository = context.payload.repository;

  // Add default reviewers
  const reviewers = ["maintainer1", "maintainer2"];

  context.log.info(`Requesting reviewers for PR #${pullRequest.number}`);

  await context.octokit.pulls.requestReviewers({
    owner: repository.owner.login,
    repo: repository.name,
    pull_number: pullRequest.number,
    reviewers,
  });

  // Leave a welcome comment
  const commentBody = `Thank you for your contribution, @${pullRequest.user.login}! A reviewer will take a look at this soon.`;

  context.log.info(`Adding a welcome comment to PR #${pullRequest.number}`);

  await context.octokit.issues.createComment({
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: pullRequest.number,
    body: commentBody,
  });
};

/**
 * Handles the "merged" action for pull requests.
 * @param context - The Probot context object for the event.
 */
const handlePRMerged = async (context: Context): Promise<void> => {
  const pullRequest = context.payload.pull_request;
  const repository = context.payload.repository;

  context.log.info(`PR #${pullRequest.number} has been merged`);

  // Add a comment to congratulate the author
  const commentBody = `🎉 Congratulations @${pullRequest.user.login}! Your PR has been merged. Thank you for your contribution!`;

  await context.octokit.issues.createComment({
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: pullRequest.number,
    body: commentBody,
  });

  // Optionally add labels or other actions for merged PRs
};

/**
 * Handles the "ready_for_review" action for pull requests.
 * @param context - The Probot context object for the event.
 */
const handlePRReadyForReview = async (context: Context): Promise<void> => {
  const pullRequest = context.payload.pull_request;
  const repository = context.payload.repository;

  context.log.info(`PR #${pullRequest.number} is ready for review`);

  // Add a comment acknowledging the PR is ready for review
  const commentBody = `PR #${pullRequest.number} is now ready for review. Thank you, @${pullRequest.user.login}!`;

  await context.octokit.issues.createComment({
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: pullRequest.number,
    body: commentBody,
  });
};
