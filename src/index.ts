import { run } from "probot";
import { initializeApp } from "./app";

/**
 * Main entry point of the application.
 * Probot uses this file to start the bot.
 */
run((app) => {
  // Initialize the bot application
  initializeApp(app);
});
