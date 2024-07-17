const prclosed = async (context) => {
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
};
export default (app) => {
    app.on("pull_request.closed", prclosed);
};
//# sourceMappingURL=closed.js.map