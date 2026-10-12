# Technical analysis

## Repository evidence

- Stack and relevant conventions: Static HTML/CSS/vanilla JavaScript; no game framework. `styles.css` already centralizes interaction transitions and has a global `prefers-reduced-motion: reduce` override.
- Relevant files/modules: `app.js` owns Star Scout movement and Merge Garden board state/rendering; `styles.css` owns `.star-cell` and `.merge-tile` visuals.
- Merge Garden uses 16 fixed grid-cell elements. `moveTiles` compacts/merges values and `renderMergeBoard` rewrites the same cells, while the current `.merge-tile` pop animation runs on every render. This does not communicate the direction or source of a move.
- Star Scout updates its explorer position by changing which fixed `.star-cell` contains the explorer emoji; it currently jumps instantly. Dino Dash already continuously translates its runner/obstacle, Memory Match has flip motion, and other games have fitting feedback transitions.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Add smooth sliding/movement animation to game interactions wherever it fits existing mechanics. | Preserve existing motion in games where it already fits; animate Star Scout's one-cell movement in the requested direction. | Static review of direction-to-offset mapping and existing game motion; execution-based tests not run per repository instructions. |
| Merge Garden tiles visibly slide when the board changes, including moves that merge tiles. | Retain source indices while compacting each line; animate each resulting tile from its source cell to its destination, including merge survivors. New random tiles should use entry/pop feedback rather than a fake slide. | Static review of movement mapping for all direction branches, merge source choice, and render lifecycle. |
| Animation respects reduced-motion preferences and does not interfere with input/state updates. | Keep animations CSS-only and brief; use the existing reduced-motion media rule to disable transitions/animations. Board state updates synchronously before visual playback. | Static review of global reduced-motion rule and state/event flow. |

## Proposed design

Use the existing fixed board DOM. During a Garden move, represent each nonzero line item as `{ value, originIndex }`; when two equal items merge, carry the leading item's origin into the merged result. Pass destination-to-origin movements to rendering. For moved destinations, set CSS custom offsets based on source/destination cell rectangles and apply a short transform animation to that tile cell. Mark newly spawned tiles separately so they pop in instead of appearing to travel from a false origin. Resets remain immediate apart from initial tile entry feedback.

For Star Scout, keep the current fixed grid and synchronous state. On a valid move, set direction offsets on the explorer's destination cell and trigger a short CSS transform animation from its previous cell; blocked moves and reset do not animate. The app's existing reduced-motion rule disables both animations.

Dino Dash, Memory Match, Bubble Pop, and Light Shift already have motion appropriate to their interaction or do not move objects between grid positions, so leave those behaviors intact.

## Implementation tasks

1. Update Merge Garden line compaction to carry source cell indices through merges and expose movement data to board rendering.
2. Add short source-to-destination CSS movement for moved Garden tiles and a distinct entry animation for newly spawned tiles; avoid replaying pop animation across the whole board each move.
3. Add direction-aware one-cell slide feedback for valid Star Scout moves.
4. Confirm both motion styles are covered by the existing reduced-motion rule; perform static review only unless testing is explicitly requested.

## Data, interfaces, and dependencies

- No new dependencies or public APIs.
- The internal Merge Garden renderer may accept per-move origin/destination and spawned-tile data.
- Star Scout's existing direction table supplies the slide offset.

## Risks, assumptions, and open questions

- Interpret "PR" as referring to the app's games, as the request immediately calls out adding the effect to Garden.
- Static animation state must be reset on rerender so repeated moves retrigger reliably; state and keyboard/pointer handling remain synchronous.
- No user decision is needed; execution-based validation is disallowed by repository instructions unless explicitly requested.

## Developer handoff

- Next owner: Developer
- Ready when: The two fixed-cell movement paths are understood and the design is limited to fitting sliding interactions; both are mapped to the acceptance criteria above.
