const iclosed = async (context) => {
    const issueComment = context.issue({ body: 'This issue has been closed.' });
    await context.octokit.issues.createComment(issueComment);
};
export default (app) => {
    app.on("issues.closed", iclosed);
};
//# sourceMappingURL=closed.js.map