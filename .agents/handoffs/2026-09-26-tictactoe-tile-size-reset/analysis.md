# Technical analysis

## Repository evidence

- Current board is a CSS grid with equal fractional columns and a 1:1 aspect ratio.
- app.js owns board state and a delayed reset for the draw snapshot.
- A reset animation can preserve marks briefly before clearing them; moves must be blocked during the transition.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| User-controlled tile size | Accessible range control writes a requested cell size CSS custom property | Simulate slider input and check property/output |
| Keep surrounding boxes fixed | Explicit equal grid columns and bounded input slots remain independent of tile size | CSS structural checks |
| Animate reset | Apply reset class while marks remain visible, then clear board after a short animation delay | Controlled timer checks before/after animation |
| Preserve game behavior | Cancel pending draw timeout on manual reset; keep names, scores, and tile size | Regression runner for win/draw/name/reset |
| Responsive board | Clamp requested size against viewport width | CSS check for responsive clamp |

## Proposed design

Add a labelled range slider (56–120 px) with a live output. Apply its value to a CSS custom property on the board; size each of the nine cells from that property and clamp it to viewport-safe dimensions. Reset should lock input, remove result styles, apply a reset animation class while marks remain visible, and clear the board after the short animation. The draw timer invokes the same reset path after its 10-second snapshot. Keep names, scores, and tile-size selection intact.

## Implementation tasks

1. Add accessible tile-size range and value output.
2. Convert the board to equal explicit-size cells controlled by the slider and responsive CSS clamp.
3. Add a guarded reset animation phase, then restore the empty board.
4. Extend simulations for size updates, animation-before-clear, and prior gameplay regressions.

## Data, interfaces, and dependencies

Use the range input and a CSS custom property; no new packages or persistence.

## Risks, assumptions, and open questions

- Reset should take under half a second so a round restart feels responsive.
- The 10-second draw snapshot starts its reset animation only after those 10 seconds.

## Developer handoff

- Next owner: Developer
- Ready when: Slider resizes square tiles, reset animates existing marks before clearing, and game outcomes are unchanged.
