
import { Probot } from "probot";

const iclosed = async (context: any) => {
    const issueComment = context.issue({ body: 'This issue has been closed.' });
    await context.octokit.issues.createComment(issueComment);
};

export default (app: Probot) => {
    app.on("issues.closed", iclosed);
};
