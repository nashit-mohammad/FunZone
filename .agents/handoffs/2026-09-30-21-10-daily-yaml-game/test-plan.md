# Test plan

| Case ID | Acceptance criterion | Scenario and steps | Expected result | Type |
|---|---|---|---|---|
| T-01 | Add exactly one distinct, playable game | Inspect the catalog card, matching play section, selectors, and initializer. | One Light Shift game is available and its play control navigates to the dedicated game area; existing games remain unchanged. | Manual static review |
| T-02 | Controls, rules/status, replay | Trace board initialization, a tile activation, repeating the fixed setup moves, and reset behavior. | A tile press toggles itself and valid orthogonal neighbors; counts update; applying the setup moves clears the board; reset restores the same solvable puzzle and zero moves. | Manual static review |
| T-03 | Accessibility and responsive behavior | Inspect native controls, names/pressed states, live status, keyboard semantics, focus behavior, and mobile/desktop CSS. | Tiles work with keyboard activation, announce their current state, completion is announced, and the board/panel fit the existing responsive breakpoints. | Manual static review |
| T-04 | Preserve architecture and avoid scope expansion | Review the complete product diff and diagnostics. | Only existing HTML/CSS/vanilla JavaScript files change for product behavior; no dependencies or external services are added. | Manual static review |
