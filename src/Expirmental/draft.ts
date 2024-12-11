import { Probot } from "probot";
import semver from "semver";

const draft = async (context: any) => {
    // Draft new release based on merged pull requests
    if (context.payload.pull_request.merged) {
        const owner = context.payload.repository.owner.login;
        const repo = context.payload.repository.name;
        const prNumber = context.payload.pull_request.number;

        const { data: pull } = await context.octokit.pulls.get({
            owner,
            repo,
            pull_number: prNumber,
        });

        const releaseNotes = `## ${pull.title}\n\n${pull.body}`;

        const latestRelease = await context.octokit.repos.getLatestRelease({
            owner,
            repo,
        });

        const newVersion = semver.inc(latestRelease.data.tag_name, "patch");

        await context.octokit.repos.createRelease({
            owner,
            repo,
            tag_name: newVersion,
            name: `Release ${newVersion}`,
            body: releaseNotes,
        });
    }
};


export default (app: Probot) => {
    app.on("pull_request.closed", draft);
};
