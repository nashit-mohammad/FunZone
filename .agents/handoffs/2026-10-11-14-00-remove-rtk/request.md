# Request

"remove RTK completely"

## Acceptance criteria
- Remove all RTK-specific guidance, scripts, and repo-level dependency references from the workspace.
- Ensure the repo no longer instructs agents or workflows to rely on `rtk` being installed.
- Preserve the working GitHub Copilot daily-game workflow behavior without introducing new tool requirements.
- Record the exact cleanup and verification status in the handoff artifacts.

## Scope
- Repo-level instructions and workflow prompts.
- Any RTK references in documentation or workflow generation guidance.

## Constraints
- Do not add unrelated tooling or broad redesign.
- Keep the daily-game flow functional on GitHub-hosted runners without repo-specific shell tools.
- If validation requires external execution, record it honestly as blocked or unverified.
