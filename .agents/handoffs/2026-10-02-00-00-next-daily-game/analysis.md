# Analysis: next daily game and wider Coming Soon set

## Request mapping

The current arcade has six playable mini-games and two placeholder tiles. The next addition should be a distinct playable game built in the same static HTML/CSS/JS pattern, and the placeholder set should be expanded so the catalog keeps feeling active without adding a large new system.

## Existing app structure

- The app is a single-page arcade built in `index.html`, `styles.css`, and `app.js`.
- Each game follows the same structure: a catalog card in the main arcade grid, a dedicated play section lower on the page, and a small set of event listeners and state in `app.js`.
- The current cards already include a few coming-soon tiles with visual placeholder art, so the next daily addition fits naturally as a playable card plus more future placeholders.

## Proposed implementation

1. Promote one upcoming idea to a playable game, using the existing `Bubble Pop` concept already present as a placeholder tile.
2. Add a dedicated `Bubble Pop` play section with a compact interactive board and a reset flow.
3. Keep the catalog numbering consistent: playable games stay before the Coming Soon cards, and the new playable card becomes the next number in sequence.
4. Extend the Coming Soon list with extra placeholder cards for future games.
5. Reuse the established styling conventions instead of introducing a new framework or game engine.

## Design choices

- Use a simple arcade gameplay loop: spawn a few bubbles, click to pop valid targets, track score, and reset when the round is complete.
- Keep the interaction finger-friendly and keyboard-accessible with readable status text and button controls.
- Use CSS-only visual styling for the new card and a minimal JS state machine to keep the change focused and maintainable.

## Risks and constraints

- Avoid duplicating existing mechanics from games already in the catalog.
- Keep the UI accessible and readable at small mobile breakpoints.
- Do not disturb the currently working Tic Tac Toe, Memory Match, Star Scout, Dino Dash, Quick Draw, or Light Shift implementations.

## Validation approach

- Static review of the catalog and section ordering.
- Verify the new game exists as a playable card and has a matching section.
- Verify the additional Coming Soon cards remain non-interactive tiles.
- Run a browser load check by opening the page locally to confirm no script errors are thrown.
