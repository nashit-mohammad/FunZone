# Implementation handoff

## Summary

Added artifact-first, context-efficient handoff rules to `AGENTS.md`, narrowed each persona's default inputs to stage-relevant artifacts, and aligned the daily-game prompt.

## Files changed

- `AGENTS.md` — defines source-of-truth artifacts, short transition notes, non-duplication, and stage-specific inputs/outputs.
- `.github/codex/prompts/daily-game.md` — asks daily-game stages to use linked artifacts and avoid repeating/reopening context without need.

## Plan deviations and decisions

- Conversation history remains available during same-session work; the new instructions reduce unnecessary reliance on it but do not imply context isolation.

## Checks actually run

| Command/check | Result | Evidence or limitation |
|---|---|---|
| Static review of persona input/output guidance | Completed | Confirmed Orchestrator checks status and incoming output; Analyser defaults to request/status and relevant code; Developer to analysis/status and relevant code; Tester to plan/implementation/status and changed code. |
| Static review of handoff and daily-game wording | Completed | Handoff notes point to artifacts and criteria instead of copying content; prompt follows same practice. |
| `rtk git diff --check` | Passed | No whitespace errors. |
| Tests | Not run | Instruction-only change; user did not request tests. |

## Known issues and follow-up

- Same-session persona stages still have access to earlier conversation context; instructions now discourage redundant rereads and recaps.

## Tester handoff

- Next owner: Tester
- Focus areas: Ensure the rules reduce duplication without blocking access to original criteria, upstream rationale, or defect evidence.
