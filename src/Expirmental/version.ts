import { Probot } from "probot";
import semver from "semver";
import fs from "fs";
import path from "path";

const version = async (context: any) => {
    // Bump version in package.json
    if (context.payload.pull_request.merged) {
        const packageJsonPath = path.resolve(process.cwd(), "package.json");
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

        const newVersion = semver.inc(packageJson.version, "patch");

        packageJson.version = newVersion;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        const { data: currentCommit } = await context.octokit.repos.getCommit({
            owner: context.payload.repository.owner.login,
            repo: context.payload.repository.name,
            ref: context.payload.pull_request.head.sha,
        });

        await context.octokit.repos.createOrUpdateFileContents({
            owner: context.payload.repository.owner.login,
            repo: context.payload.repository.name,
            path: "package.json",
            message: `chore: bump version to ${newVersion}`,
            content: Buffer.from(JSON.stringify(packageJson, null, 2)).toString("base64"),
            sha: currentCommit.sha,
        });
    }
};

export default (app: Probot) => {
    app.on("pull_request.closed", version);
};