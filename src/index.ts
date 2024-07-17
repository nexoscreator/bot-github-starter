import { Probot } from "probot";
//for issue
import { iopened, iclosed } from "./issue.js";
// for pull requst
import { propened, prclosed } from "./pull-request.js";
// import review from "./Pull Request/review.js";
// import merge from "./Pull Request/merge.js";
import changelog from "./Pull Request/changelog.js";
// for notification
import { issuenotify, pullnotify } from "./notify.js";
//for release
import published from "./Release/published.js";
import draft from "./Release/draft.js";
import review  from "./Pull Request/review.js";

export default (app: Probot) => {

  app.log.info("Yay, my app is loaded");

  // issue
  app.on("issues.opened", iopened);
  app.on("issues.closed", iclosed);

  // pull request
  app.on("pull_request.opened", propened);
  app.on("pull_request.closed", prclosed);
  // review(app);
  // merge(app);
  changelog(app);

  // notification
  app.on("issues.opened", issuenotify);
  app.on("pull_request.opened", pullnotify);

  // release
  published(app);
  draft(app);
  review(app);


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