import { Probot } from "probot";

const published = async (context: any) => {
    const release = context.payload.release;
    
    const notes = `## ${release.name}\n\n${release.body}`;
    
    const issue = context.issue({ body: notes, title: `Release Notes: ${release.name}` });
    await context.octokit.issues.create(issue);
};

export default (app: Probot) => {
    app.on("release.published", published);
};
