//src/issue.ts

export const IssueClosed = async (context: any) => {
    const issueComment = context.issue({ body: 'This issue has been closed.' });
    await context.octokit.issues.createComment(issueComment);
};


export const IssueOpned = async (context: any) => {
    // When issue opned
    const admin = context.payload.issue;
    const issue = context.issue();
    const { title } = context.payload.issue;

    // Example rules for labeling
    const labels: string[] = [];
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

export const labels = async (context: any) => {
    const issue = context.issue();
    const { title, body } = context.payload.issue;

    // Example rules for labeling
    const labels: string[] = [];
    if (title.includes("bug") || body.includes("bug")) {
        labels.push("bug");
    }
    if (title.includes("feature") || body.includes("feature")) {
        labels.push("enhancement");
    }

    if (labels.length > 0) {
        await context.octokit.issues.addLabels({
            ...issue,
            labels,
        });
    }
};