# Technical analysis

## Repository evidence

- The current workflow is `.github/workflows/daily-game.yml`; it checks out `main`, creates the six handoff artifacts, prepares a per-run prompt, adds open FunZone game PR titles, uploads the handoff, and uses `peter-evans/create-pull-request@v8` to open a non-merging review PR.
- The model-specific step is `openai/codex-action@v1`. The reusable task prompt lives at `.github/codex/prompts/daily-game.md` and already describes the role handoffs and safety constraints.
- The workflow currently schedules at 14:37 in `America/Toronto`, while the retained task prompt requests 9 AM daily.
- Existing workflow permissions are `contents: write` and `pull-requests: write`; the prompt says not to change workflow permissions or repository settings.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Keep the scheduled and manual triggers | Retain `schedule` and `workflow_dispatch`; align schedule with the existing 9 AM request | Static YAML review |
| Replace Codex while retaining the workflow plan | Install GitHub Copilot CLI on the Ubuntu runner and invoke its programmatic prompt mode with the generated prompt and existing handoff directory | Static step/input review; no workflow dispatch requested |
| Preserve a main-based review PR, never merge | Keep checkout of `main` and create-pull-request action, rename branch and PR copy from Codex to Copilot | Static review |
| Make remote scheduling usable | Use a `COPILOT_GITHUB_TOKEN` Actions secret for Copilot Requests, distinct from the `GITHUB_TOKEN` used by PR steps; document token setup | Handoff and final instructions |
| Preserve handoff process and honestly report verification | Leave prompt/artifact mechanics intact and record that execution validation was not requested | Artifact review |

## Proposed design

Use GitHub Copilot CLI in the existing Actions job, not a wholesale conversion to Agentic Workflows. Set up Node.js 22, install `@github/copilot`, and invoke `copilot -p` with the prepared prompt. Authenticate through a repository Actions secret named `COPILOT_GITHUB_TOKEN`; this avoids expanding the existing `GITHUB_TOKEN` permissions or coupling the agent's inference token to PR write permissions. Use `--secret-env-vars=COPILOT_GITHUB_TOKEN` so spawned shell/MCP tools do not receive that credential. Retain the existing PR action and handoff upload. Keep the current prompt directory for compatibility with the task plan.

Change the cron to `0 9 * * *` in `America/Toronto` to meet the 9 AM schedule stated by the existing task prompt. Rename the generated PR branch/body text to Copilot.

## Implementation tasks

1. Update the schedule to 9 AM Toronto time.
2. Replace the Codex action with Node setup, Copilot CLI installation, and a non-interactive CLI call using the run-specific prompt, handoff path, and Copilot token secret.
3. Update PR branch and body wording to Copilot while preserving main as base and no auto-merge.
4. Complete implementation and test handoff artifacts. Do not execute tests or dispatch a remote workflow unless requested.

## Data, interfaces, and dependencies

- Required repository secret: `COPILOT_GITHUB_TOKEN`, a fine-grained personal access token with Copilot Requests permission. It is only supplied to the Copilot CLI step. The existing `GITHUB_TOKEN` permissions remain for open-PR listing and PR creation.
- Runtime dependency: `@github/copilot` installed in the ephemeral Ubuntu job via npm; no repository package/config changes.

## Risks, assumptions, and open questions

- A Copilot-enabled account/organization and Copilot Requests token are required; scheduled execution will fail until the repository secret is configured.
- `--allow-all-tools` is required for non-interactive agent execution and allows shell/tool use; review the generated PR as the workflow already requires.
- Installing the latest CLI each run is simple but is not version-pinned.
- GitHub workflow execution is remote and independent of the user's PC being on.

## Developer handoff

- Next owner: Developer
- Ready when: Implement the minimal Copilot CLI replacement, preserve the current PR/handoff path, and set the schedule to the plan's 9 AM Toronto time.
