# Daily game proposals

The `Daily FunZone Game` workflow asks Codex to add one distinct, playable game every day at 9:00 AM America/Toronto. It runs on GitHub-hosted infrastructure while the local PC may be off.

Every run checks out `main` and creates a unique `codex/daily-game-<run-id>` branch with `main` as the PR base. Open daily-game PR titles are provided to Codex to avoid duplicate proposals. PRs are for review only; there is no auto-merge.

Each run creates the normal repository handoff folder at `.agents/handoffs/<YYYY-MM-DD-HH-mm>-daily-game-<run-id>/`. The workflow initializes `request.md` and `status.md` at intake and copies `analysis.md`, `implementation.md`, `test-plan.md`, and `test-report.md` from `.agents/templates/`. Codex must follow the four persona stages in `AGENTS.md`, record each transition in `status.md`, and finish the artifacts in this same folder. The complete folder is uploaded as a 90-day Actions artifact and excluded from the product PR diff; it is not stored in a second workflow-specific location.

## One-time GitHub setup

1. Add an OpenAI API key as an Actions secret named `OPENAI_API_KEY` under **Settings → Secrets and variables → Actions**.
2. Under **Settings → Actions → General → Workflow permissions**, enable permission for GitHub Actions to create pull requests. The workflow requests `contents: write` and `pull-requests: write` only.
3. Merge this workflow, prompt, and setup guide to the repository's `main` branch. Scheduled workflows run from the default branch.
4. Under **Actions → Daily FunZone Game**, select **Run workflow** for the first run, then review the created PR and its handoff artifact.

The API key is not stored in this repository. Every game remains unmerged until a human reviews and merges its PR.
