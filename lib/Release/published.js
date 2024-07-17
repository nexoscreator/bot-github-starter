const published = async (context) => {
    const release = context.payload.release;
    const notes = `## ${release.name}\n\n${release.body}`;
    const issue = context.issue({ body: notes, title: `Release Notes: ${release.name}` });
    await context.octokit.issues.create(issue);
};
export default (app) => {
    app.on("release.published", published);
};
//# sourceMappingURL=published.js.map