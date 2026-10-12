# Implementation handoff

## Summary

Added one shared-quality instruction requiring smooth, responsive and suitably consistent motion across games, matched to each game's mechanics and state changes, while preserving immediate input, avoiding unnecessary motion, and honoring reduced-motion preferences.

## Files changed

- `AGENTS.md` — Added the guidance under `### Shared quality rules`, the canonical section for repository-wide agent behavior.

## Plan deviations and decisions

- None.

## Checks actually run

| Command/check | Result | Evidence or limitation |
|---|---|---|
| VS Code diagnostics for `AGENTS.md` | No errors found | Documentation-only change. |
| `rtk git diff -- AGENTS.md` | Reviewed | One focused guidance bullet added; no unrelated changes in the diff. |
| Tests | Not run | Documentation-only change; no relevant executable test. |

## Known issues and follow-up

- None.

## Tester handoff

- Next owner: Tester
- Focus areas: Confirm the instruction is in the canonical shared section and covers smoothness, cross-game consistency, behavior matching, responsive input, and reduced motion.
