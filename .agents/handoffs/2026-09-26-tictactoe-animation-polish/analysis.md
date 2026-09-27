# Technical analysis

## Repository evidence

- Stack and conventions: Static HTML/CSS/JS. Player names and results are already handled in app.js; CSS includes reduced-motion support.
- Relevant styles: .scoreboard and .score-item are flex/grid children whose intrinsic minimum widths can be driven by long input values.
- Relevant game state: finishRound receives winner and winning line; board cells retain X/O classes.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Fixed score/name layout | Use a fixed equal-column scoreboard grid, zero intrinsic min widths, fixed input width/height, clipped text | CSS checks and inspect max-length names remain constrained |
| Win celebration | Add win state classes to board/status and winning line; animate pop/glow/sparkle | Simulate win and assert classes |
| Losing reaction | Mark non-winning cells belonging to the losing player; animate a brief wobble/fade | Simulate win and assert opponent-mark classes |
| Preserve current behavior | Reset all new state classes on new round and retain draw timer logic | Run existing gameplay suite plus new win state checks |
| Reduced motion | Disable/preserve simple state styling when prefers-reduced-motion is set | CSS check for media query override |

## Proposed design

Replace the scoreboard flex sizing with a three-column grid: two equal minmax(0,1fr) player panels around a fixed divider. Set each player panel and text input to min-width:0; inputs receive fixed height and 100% width, with overflow clipped and text ellipsis. On wins, add a celebration class to the board and status, a winner class to winning cells, and a losing class to occupied cells outside the winning line. Use CSS keyframes for winning-line bounce/glow/sparkle and loser wobble/fade. Clear all outcome classes during reset, and include reduced-motion overrides.

## Implementation tasks

1. Lock score/name panel sizing against intrinsic input content.
2. Apply winner and loser classes during a win and clear them on reset.
3. Add layered but brief CSS motion and a reduced-motion override.
4. Extend the existing simulation tests for result classes and reset cleanup.

## Data, interfaces, and dependencies

No new dependencies or state beyond outcome classes.

## Risks, assumptions, and open questions

- Keep the displayed name in the input; clip overflow without mutating the user's entered value.
- Draw state must remain visually distinct from win/lose animations.

## Developer handoff

- Next owner: Developer
- Ready when: Name-entry width stays fixed and a win visibly celebrates the winner and identifies the losing pieces.
