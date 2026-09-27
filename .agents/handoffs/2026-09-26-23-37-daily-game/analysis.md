# Technical analysis

## Repository evidence

- `origin` is `https://github.com/nashit-mohammad/FunZone.git`; its default branch is `main`.
- The local checkout is clean and no `.github` workflows exist.
- The GitHub CLI is not installed in this environment.
- The project is a static HTML/CSS/JavaScript app.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Daily cloud run at 9 AM | GitHub Actions hosted runner, cron `0 9 * * *`, timezone `America/Toronto` | Inspect workflow |
| One distinct playable game | Codex prompt asks it to inspect current catalog/open daily-game PRs, then implement one game | Inspect prompt and action wiring |
| Each PR isolated from main | Check out `main`; create a unique `codex/daily-game-<run-id>` branch with PR base `main` | Inspect workflow |
| Manual review | PR-only; no merge action | Inspect workflow |
| Activation documented | Explain required key and repository Actions permission | Inspect setup guide |

## Proposed design

Use a timezone-aware scheduled GitHub Actions workflow on a GitHub-hosted Ubuntu runner. Each run checks out `main`, prepares a timestamped role handoff, passes open daily-game PR titles into the Codex prompt to avoid duplication, and asks Codex to integrate one small, accessible game. Upload the handoff as a run artifact. If there are application changes, create a PR from a unique run-ID branch to `main`, excluding the handoff files. Never merge.

## Implementation tasks

1. Add the daily game prompt.
2. Add the scheduled workflow with `main` checkout/base and per-run PR branch.
3. Document activation requirements.
4. Review workflow and prompt statically.

## Data, interfaces, and dependencies

- GitHub Actions secret `OPENAI_API_KEY` for the OpenAI Codex Action.
- GitHub Actions repository permission to create pull requests.

## Risks, assumptions, and open questions

- The workflow is inactive until its files are merged to `main` and the key/settings are configured.
- No authenticated `gh` CLI is available, so this environment cannot publish the setup branch as a PR.

## Developer handoff

- Next owner: Developer
- Ready when: Create workflow, prompt, and activation docs without publishing or merging.
# Analysis: hosted daily game proposals

## Acceptance criteria

- Run once daily at 9:00 AM in `America/Toronto`, even with the user's PC off.
- Each run checks out current `main`, proposes one interesting new playable FunZone game, and creates a review PR only when there is a change.
- Each PR uses a unique working branch based on `main`; no automatic merge.
- Follow the repository's role handoff process and make the required GitHub configuration explicit.

## Repository findings and design

- FunZone is a static HTML/CSS/vanilla-JavaScript project on GitHub (`nashit-mohammad/FunZone`), with `main` as the default branch.
- A GitHub Actions hosted Ubuntu runner is the remote execution environment; it does not depend on the PC being on.
- Use the Codex GitHub Action with a repository Actions secret, then `peter-evans/create-pull-request` with `base: main` and a run-unique branch name. Keep generated handoffs as an Actions artifact, outside the product PR diff.
- Pass titles from open game PRs as untrusted context to reduce duplicate proposals. The prompt directs Codex to inspect the current catalog and keep the game focused, accessible, and dependency-free.
- Schedule at 09:00 with the `America/Toronto` timezone. Retain manual dispatch for setup verification.

## Risks and prerequisites

- Repository owner must add `OPENAI_API_KEY` as an Actions secret and enable Actions to create pull requests.
- Scheduled workflows are available after this workflow reaches the default branch (`main`). A live run and PR cannot be verified from this workspace without configured credentials and GitHub access.
- API usage incurs OpenAI API charges according to the configured account.

## Implementation plan

1. Add the scheduled/manual workflow, which checks out `main`, creates the timestamped role handoff, invokes Codex, uploads the handoff, and opens a PR from `codex/daily-game-<run-id>` to `main` when a product diff exists.
2. Add a stable Codex prompt that instructs one distinct game per run, repository conventions, quality expectations, and honest validation/handoff reporting.
3. Add one-time setup instructions and keep the PR review-only.
4. Perform static review and diff checks; do not execute tests unless requested. Record remote activation as blocked pending owner configuration.
