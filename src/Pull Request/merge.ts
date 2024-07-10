import { Probot } from "probot";

const autoMerge = async (context: any) => {
  const { owner, repo } = context.repo();
  const pull_number = context.payload.pull_request.number;

  const pullRequest = await context.octokit.pulls.get({
    owner,
    repo,
    pull_number,
  });

  const { data: reviews } = await context.octokit.pulls.listReviews({
    owner,
    repo,
    pull_number,
  });

  const approved = reviews.some((review: any) => review.state === "approved");

  if (pullRequest.data.mergeable && approved) {
    await context.octokit.pulls.merge({
      owner,
      repo,
      pull_number,
      commit_title: `Merging pull request #${pull_number}`,
      merge_method: "squash",
    });
  }
};

export default (app: Probot) => {
  app.on(["pull_request_review.submitted", "pull_request.synchronize"], autoMerge);
};
