# Analysis

## Request summary
The user wants RTK removed completely from the repository and from the agent guidance that currently depends on it.

## Relevant repo evidence
- [AGENTS.md](AGENTS.md) begins with an `@RTK.md` include, which causes the repo instructions to load RTK guidance automatically.
- [RTK.md](RTK.md) defines the RTK command wrapper and usage rules.
- [.clinerules](.clinerules) is a dedicated RTK/Cline rule file.
- [.github/copilot/prompts/daily-game.md](.github/copilot/prompts/daily-game.md) tells the GitHub Copilot agent to follow `RTK.md` before proceeding.

## Implementation direction
1. Remove the RTK root include from [AGENTS.md](AGENTS.md).
2. Delete the dedicated RTK docs and Cline rule file so the repo no longer carries the RTK tool contract.
3. Remove the RTK instruction from the GitHub Copilot prompt so the workflow uses repository instructions directly and does not depend on RTK.
4. Confirm there are no remaining RTK references in active guidance.

## Risks and constraints
- The repo's generated workflow is already intentionally independent of a custom shell wrapper; removing RTK should not alter the daily-game behavior or branch/PR flow.
- Live remote execution is not available in this local session, so validation is limited to static review and repo search verification.
