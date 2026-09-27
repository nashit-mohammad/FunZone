# Technical analysis

## Repository evidence

- Stack and relevant conventions: Existing dependency-free HTML, CSS, and JavaScript app. Game state, names, and scores live in app.js.
- Relevant files/modules: index.html has the game intro, scoreboard, and board; styles.css contains game panel/status/board styling; app.js owns state and outcomes.

## Requirements mapping

| Acceptance criterion | Technical requirement | Validation approach |
|---|---|---|
| Enter player names | Two labelled text fields; trim/fallback empty values; safely show names in turn/status and score area | Simulate name edits, turns, and result display |
| Clear draw state | Add visible draw status and contrasting highlight to all final board cells | Simulate draw and assert draw classes/status |
| Preserve final snapshot 10 seconds | Keep board disabled and unchanged until a 10,000 ms timer completes | Use controllable fake timers and assert before/after deadline |
| Preserve scores/names after reset | Reset only board/turn/outcome; retain name inputs and scores | Assert values before and after timer |
| Keep manual reset | Clear a pending draw timer and reset immediately | Assert timer cancellation and empty board |

## Proposed design

Add two labelled player name inputs with default labels Player X and Player O as placeholders/fallbacks. Show trimmed input values in the scoreboard, turn prompt, and win message; escape user values before inserting them in the existing live status markup. Store the timer handle in app.js and clear it on manual reset. On a draw, mark the board and every cell with a clear draw style, announce that the snapshot will remain for 10 seconds, and schedule a resetRound call after 10,000 ms. The reset clears outcome visuals but preserves names and scores.

## Implementation tasks

1. Add accessible name fields and editable scoreboard names.
2. Update turn/winner strings from the current entered names, with safe escaping and sensible empty-name fallback.
3. Give draw outcomes a distinctive status and board/cell highlight that stays visible during a 10-second delay.
4. Automatically reset after 10 seconds; ensure manual reset cancels pending reset and scores/names persist.
5. Extend automated game simulation to control the timer and validate all requested states.

## Data, interfaces, and dependencies

No dependencies or persistence. Names are read from current inputs. A single browser timeout controls the drawn-snapshot delay.

## Risks, assumptions, and open questions

- Use Player X and Player O when an input is blank after trimming.
- User-entered names must be rendered as text safely and not interpreted as markup.

## Developer handoff

- Next owner: Developer
- Ready when: Names render throughout a round and draw snapshots visibly persist until the 10-second reset.
