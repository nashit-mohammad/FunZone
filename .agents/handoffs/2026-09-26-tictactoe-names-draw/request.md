# Request

## User's request

“Allow user to have a name innputted for tic tac. Also, if its a draw highlight clearly of teh draw and reset it back, but let the screens have the last snapshot visible for 10 seconds”

## Acceptance criteria

- [ ] Let each player enter a display name for Tic Tac Toe; show those names in the game status and score area.
- [ ] On a draw, clearly indicate the draw and visually highlight the completed board.
- [ ] Keep the drawn board snapshot visible for 10 seconds, then automatically reset the board for a new round.
- [ ] Preserve scores and player names through the automatic reset.
- [ ] Keep manual new-round behavior available.

## Scope and constraints

- Extend the existing browser-native implementation without adding dependencies.
- Interpret “reset it back” as automatically starting a fresh round after the requested 10-second snapshot.

## Work item metadata

- ID: 2026-09-26-tictactoe-names-draw
- Created: 2026-09-26 America/Toronto
