const iopened = async (context) => {
    // When issue opned
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
};
export default (app) => {
    app.on("issues.opened", iopened);
};
//# sourceMappingURL=opned.js.map