# Daily game proposals

The `Daily FunZone Game` workflow uses GitHub Copilot CLI to add one distinct, playable game every day at 9:00 AM America/Toronto. It runs on GitHub-hosted infrastructure while the local PC may be off.

The workflow exits early whenever an open `FunZone game:` PR is already present on `main`. If there is no open daily-game PR, the workflow proceeds to create the next game and review PR. This keeps only one active game review at a time.

Every run checks out `main`, prepares a timestamped handoff folder under `.agents/handoffs/<YYYY-MM-DD-HH-mm>-daily-game-<run-id>/`, and creates a dedicated branch named `copilot/daily-game-<run-id>` with `main` as the PR base. The workflow also inspects open FunZone game PR titles to help avoid duplicate mechanics and product proposals. PRs are for review only; there is no auto-merge.

Each run copies the standard role templates from `.agents/templates/` into the work item folder, initializes the intake `request.md` and `status.md`, and then asks Copilot to complete the Orchestrator → Analyser → Developer → Tester → Orchestrator flow described in `AGENTS.md`. The finished handoff folder is uploaded as a 90-day GitHub Actions artifact and excluded from the PR diff; it is not stored in a second workflow-specific location.

## One-time GitHub setup

1. Add a repository Actions secret named `COPILOT_GITHUB_TOKEN` under **Settings → Secrets and variables → Actions**. The token must have Copilot Requests access and be valid for the GitHub App or PAT used by the workflow.
2. Under **Settings → Actions → General → Workflow permissions**, enable permission for GitHub Actions to create pull requests. The workflow requests `contents: write` and `pull-requests: write` only.
3. Merge this workflow, prompt, and setup guide to the repository's `main` branch. Scheduled workflows run from the default branch.
4. Under **Actions → Daily FunZone Game**, select **Run workflow** for the first run, then review the created PR and its handoff artifact.

The workflow does not use custom email sending or any external SMTP dependency. Every game remains unmerged until a human reviews and merges its PR.

## Current workflow behavior

- Uses `actions/setup-node` and installs the GitHub Copilot CLI via `npm install --global @github/copilot`.
- Checks for any open `FunZone game:` PR on `main`; it exits early whenever one is still open.
- Runs the prompt from `.github/copilot/prompts/daily-game-run-<run-id>.md` with the exact handoff directory injected into the prompt text.
- Saves the generated role artifacts as the workflow artifact named `daily-game-handoff-<run_id>`.
- Opens a review PR with `peter-evans/create-pull-request@v8` using the title `FunZone game: <Game name>` when the run changed application files.
- Does not auto-merge and keeps all PRs on a review-only path.
