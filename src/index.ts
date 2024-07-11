import { Probot } from "probot";
//for issue
import iopned from "./Issue/opned.js";
import iclosed from "./Issue/closed.js";
// for pull requst
import propned from "./Pull Request/opned.js";
import prclosed from "./Pull Request/closed.js";
import review from "./Pull Request/review.js";
import merge from "./Pull Request/merge.js";
import changelog from "./Pull Request/changelog.js";
//for release
import published from "./Release/published.js";

export default (app: Probot) => {

  app.log.info("Yay, my app is loaded");

  app.on("push", async (context) => {
    // Code was pushed to the repo, what should we do with it?
    app.log.info(context);
  });

  // issue
  iopned(app)
  iclosed(app)

  // pull request
  propned(app);
  prclosed(app);
  review(app);
  merge(app);
  changelog(app);

  // release
  published(app);

  app.onAny(async (context) => {
    app.log.info({ event: context.name});
  });
};