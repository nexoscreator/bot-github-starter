const propened = async (context) => {
    // When pull request opned
    const comment = context.issue({
        body: `Thank you for opening this pull request! We will review it shortly.`
    });
    await context.octokit.issues.createComment(comment);
};
export default (app) => {
    app.on("pull_request.opened", propened);
};
//# sourceMappingURL=opned.js.map