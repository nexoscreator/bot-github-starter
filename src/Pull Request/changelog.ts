import { Probot } from "probot";

const updateChangelog = async (context: any) => {
  const { owner, repo } = context.repo();
  const pullRequest = context.payload.pull_request;

  const changelogEntry = `- ${pullRequest.title} (#${pullRequest.number})`;

  const content = await context.octokit.repos.getContent({
    owner,
    repo,
    path: "CHANGELOG.md",
  });

  const changelogContent = Buffer.from(content.data.content, 'base64').toString('utf-8');

  const newContent = `${changelogEntry}\n${changelogContent}`;
  
  await context.octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: "CHANGELOG.md",
    message: `Update CHANGELOG.md for PR #${pullRequest.number}`,
    content: Buffer.from(newContent).toString('base64'),
    sha: content.data.sha,
  });
};

export default (app: Probot) => {
  app.on("pull_request.closed", async (context) => {
    if (context.payload.pull_request.merged) {
      await updateChangelog(context);
    }
  });
};
