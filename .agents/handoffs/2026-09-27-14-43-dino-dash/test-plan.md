# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Dedicated unpublished branch | Inspect current branch and upstream refs | Current branch is `codex/dino-dash-game` from main, with no publication action performed | Static review |
| T-02 | Dino Dash catalog entry opens the game | Inspect card and listener wiring | Play button scrolls to Dino Dash and focuses Start run | Static review |
| T-03 | Complete run lifecycle | Inspect start, animation frame, collision, restart, and score handlers | Run initializes; jump avoids obstacle; cleared obstacle scores; collision stops run; replay starts fresh; best persists for visit | Static review |
| T-04 | Accessible controls/status | Inspect labels, focusability, keyboard listener, button states, and live region | Space/Arrow Up and Jump button work when playing; instructions are exposed; start/end/score events are announced | Static review |
| T-05 | Responsive presentation | Inspect mobile/desktop media rules and stage layout | Panel becomes one column on mobile and playable field fits the content width | Static review |
| T-06 | Diff hygiene | `rtk git diff --check` | No whitespace errors | Automated check |

Application tests and browser checks were not requested and will not be run.
