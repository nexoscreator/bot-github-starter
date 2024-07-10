import { Probot } from "probot";
import { exec } from "child_process";

const runLint = async (context: any) => {
  const { repo } = context.repo();

  // Clone the repository
  exec(`git clone ${context.payload.repository.clone_url}`, (error, stderr) => {
    if (error) {
      context.log.error(`Clone error: ${stderr}`);
      return;
    }

    // Run ESLint
    exec("npx eslint .", { cwd: `${repo}` }, async (lintError, lintStderr) => {
      if (lintError) {
        context.log.error(`ESLint error: ${lintStderr}`);
        // Post ESLint results as a comment on the PR
        const issueComment = context.issue({ body: `ESLint found issues:\n${lintStderr}` });
        await context.octokit.issues.createComment(issueComment);
      }
    });

    // Run Prettier
    exec("npx prettier --check .", { cwd: `${repo}` }, async (prettierError, prettierStderr) => {
      if (prettierError) {
        context.log.error(`Prettier error: ${prettierStderr}`);
        // Post Prettier results as a comment on the PR
        const issueComment = context.issue({ body: `Prettier found issues:\n${prettierStderr}` });
        await context.octokit.issues.createComment(issueComment);
      }
    });
  });
};

export default (app: Probot) => {
  app.on("pull_request.opened", runLint);
};
