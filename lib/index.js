export default (app) => {
    // When issue opned
    app.on('issues.opened', async (context) => {
        const admin = context.payload.issue;
        const issue = context.issue();
        const { title } = context.payload.issue;
        // Example rules for labeling
        const labels = [];
        if (title.includes("bug")) {
            labels.push("bug");
        }
        if (title.includes("feature")) {
            labels.push("enhancement");
        }
        if (labels.length > 0) {
            await context.octokit.issues.addLabels({
                ...issue,
                labels,
            });
        }
        // Exaple of comments 
        const issueComment = context.issue({
            body: `Thanks for opening this issue, @${admin.user.login}! We will look into it.`,
        });
        await context.octokit.issues.createComment(issueComment);
    });
    app.on('issues.closed', async (context) => {
        const issueComment = context.issue({ body: 'This issue has been closed.' });
        await context.octokit.issues.createComment(issueComment);
    });
    // when pull request open
    app.on("pull_request.opened", async (context) => {
        const comment = context.issue({
            body: `Thank you for opening this pull request! We will review it shortly.`
        });
        await context.octokit.issues.createComment(comment);
    });
    app.on("pull_request.closed", async (context) => {
        const pullRequest = context.payload.pull_request;
        if (pullRequest.merged) {
            const comment = context.issue({
                body: `Congratulations on merging this pull request! 🎉`
            });
            await context.octokit.issues.createComment(comment);
        }
        else {
            const comment = context.issue({
                body: `This pull request was closed without being merged.`
            });
            await context.octokit.issues.createComment(comment);
        }
    });
    app.on('release.published', async (context) => {
        const release = context.payload.release;
        const notes = `## ${release.name}\n\n${release.body}`;
        const issue = context.issue({ body: notes, title: `Release Notes: ${release.name}` });
        await context.octokit.issues.create(issue);
    });
};
//# sourceMappingURL=index.js.map