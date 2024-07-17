export const propened = async (context: any) => {
    // When pull request opned
    const sender = context.payload.pull_request.user.login;
    const comment = context.issue({
        body: `Welcome @${sender}, thank you for your contribution! 🎉`
    });

    await context.octokit.issues.createComment(comment);
};

export const prclosed = async (context: any) => {
    const pullRequest = context.payload.pull_request;

    if (pullRequest.merged) {
        const sender = context.payload.pull_request.user.login;
      const prNumber = context.payload.pull_request.number;
      const prTitle = context.payload.pull_request.title;
      const repo = context.payload.repository.name;
      const owner = context.payload.repository.owner.login;
        const comment = context.issue({
            body: `🎉 @${sender}, your pull request #${prNumber} (${prTitle}) has been merged into ${owner}/${repo}. Thank you for your contribution!`
        });

        await context.octokit.issues.createComment(comment);
    } else {
        const comment = context.issue({
            body: `This pull request was closed without being merged.`
        });

        await context.octokit.issues.createComment(comment);
    }
};
