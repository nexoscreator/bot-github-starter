import { Probot } from "probot";
import { handleIssues } from "./handlers/issue";
import { handlePullRequests } from "./handlers/pull_request";
import { sendNotifications } from "./handlers/notify";
import { handleChangelog } from "./handlers/changelog";

/**
 * Main function to initialize the Probot app and register event handlers.
 */
export const initializeApp = (app: Probot) => {
  // Log when the app is loaded
  app.log.info("Bot has been successfully loaded!");

  // Register event handlers
  app.on("issues", async (context) => {
    await handleIssues(context);
  });

  app.on("pull_request", async (context) => {
    await handlePullRequests(context);
  });

  app.on("push", async (context) => {
    await handleChangelog(context);
  });

  app.on("check_run.completed", async (context) => {
    await sendNotifications(context);
  });

  // Add other event handlers as needed
};
