# Test plan

## Scope

Validate Memory Match against the request acceptance criteria and check the responsive, keyboard-accessible interaction.

## Cases

1. Open Memory Match from its game card and confirm it scrolls to the board.
2. Reveal two different cards; confirm they remain briefly visible, then hide again.
3. Reveal a matching pair; confirm both remain revealed and the pair count increments.
4. Complete all eight pairs; confirm the final move count, elapsed time, and completion message.
5. Restart before and during a game; confirm a fresh hidden deck and reset counters/timer.
6. Use the board at desktop and mobile widths; navigate cards with keyboard and confirm accessible labels/status.

## Environment and constraints

Browser validation has not yet been performed. No automated test harness was identified or run as part of this change.
