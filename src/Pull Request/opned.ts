import { Probot } from "probot";

const propened = async (context: any) => {
    // When pull request opned

    const comment = context.issue({
        body: `Thank you for opening this pull request! We will review it shortly.`
    });

    await context.octokit.issues.createComment(comment);

};

export default (app: Probot) => {
    app.on("pull_request.opened", propened);
};
