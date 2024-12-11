import { Context } from "probot";

/**
 * Handles all GitHub issue events.
 * @param context - The Probot context object for the event.
 */
export const handleIssues = async (context: Context): Promise<void> => {
  const { action, issue, repository, sender } = context.payload;

  try {
    // Log the incoming event
    context.log.info(`Handling issue event: ${action}`);

    // Event: Issue Opened
    if (action === "opened") {
      await handleIssueOpened(context);
    }

    // Event: Issue Labeled
    if (action === "labeled") {
      await handleIssueLabeled(context);
    }

    // Event: Issue Assigned
    if (action === "assigned") {
      await handleIssueAssigned(context);
    }
  } catch (error) {
    context.log.error(`Error handling issue event: ${error}`);
  }
};

/**
 * Handles the "opened" action for issues.
 * @param context - The Probot context object for the event.
 */
const handleIssueOpened = async (context: Context): Promise<void> => {
  const issue = context.payload.issue;
  const repository = context.payload.repository;

  // Add a default label to new issues
  const label = "needs-triage";

  context.log.info(`Adding label '${label}' to issue #${issue.number}`);

  await context.octokit.issues.addLabels({
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: issue.number,
    labels: [label],
  });

  // Leave a welcome comment
  const commentBody = `Thank you for opening this issue, @${issue.user.login}! Our team will review it shortly.`;

  context.log.info(`Adding a welcome comment to issue #${issue.number}`);

  await context.octokit.issues.createComment({
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: issue.number,
    body: commentBody,
  });
};

/**
 * Handles the "labeled" action for issues.
 * @param context - The Probot context object for the event.
 */
const handleIssueLabeled = async (context: Context): Promise<void> => {
  const issue = context.payload.issue;
  const repository = context.payload.repository;
  const label = context.payload.label.name;

  context.log.info(`Issue #${issue.number} labeled with '${label}'`);

  if (label === "bug") {
    const commentBody = "Thank you for reporting this bug! We'll address it as soon as possible.";

    context.log.info(`Adding a bug acknowledgment comment to issue #${issue.number}`);

    await context.octokit.issues.createComment({
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: issue.number,
      body: commentBody,
    });
  }
};

/**
 * Handles the "assigned" action for issues.
 * @param context - The Probot context object for the event.
 */
const handleIssueAssigned = async (context: Context): Promise<void> => {
  const issue = context.payload.issue;
  const repository = context.payload.repository;
  const assignee = context.payload.assignee.login;

  context.log.info(`Issue #${issue.number} assigned to @${assignee}`);

  const commentBody = `Thanks for stepping up, @${assignee}! Please let us know if you have any questions.`;

  await context.octokit.issues.createComment({
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: issue.number,
    body: commentBody,
  });
};
