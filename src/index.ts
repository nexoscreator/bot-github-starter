import { Probot } from "probot";
import { IssueOpned, IssueClosed, labels } from "./issue.js";
import { PullOpned, PullClosed } from "./pull-request.js";
import { IssueNotify, PullNotify } from "./notify.js";
import draft from "./Release/draft.js";
import merge from "./Expirmental/merge.js";
import version from "./Release/version.js";
import changelog from "./changelog.js";

export default (app: Probot) => {
  app.log.info("Yay, my app is loaded");

  // issue
  app.on("issues.opened", IssueOpned);
  app.on("issues.closed", IssueClosed);
  app.on("issues.opened", labels);

  // pull request
  app.on("pull_request.opened", PullOpned);
  app.on("pull_request.closed", PullClosed);
  // review(app);
  merge(app);

  // notification
  app.on("issues.opened", IssueNotify);
  app.on("pull_request.opened", PullNotify);

  // release
  draft(app);
  version(app);
  changelog(app);

  // expirement workflow
  // Listen for issue and pull request comments
  app.on(["issue_comment.created", "issue_comment.edited"], async (context) => {
    const comment = context.payload.comment.body;
    const issue = context.issue();

    // Custom Command: /deploy
    if (comment.includes("/deploy")) {
      await context.octokit.issues.createComment({
        ...issue,
        body: "Deployment initiated!"
      });
      // Add your deployment logic here
    }

    // Custom Command: /rebuild
    if (comment.includes("/rebuild")) {
      await context.octokit.issues.createComment({
        ...issue,
        body: "Rebuild started!"
      });
      // Add your rebuild logic here
    }
  });

  app.onAny(async (context) => {
    app.log.info({ event: context.name });
  });
};