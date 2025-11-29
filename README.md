# Tic Tac Toe — 3-mark Cycling

Simple web implementation of Tic Tac Toe with a twist: each player may have at most three marks on the board. When a player places a fourth mark, their oldest mark is removed (freed) from the board.

Files:
- `index.html` — main page
- `style.css` — basic styling
- `app.js` — game logic

How to run:
1. Open `index.html` in your browser (double-click or run `open index.html` on macOS).

Rules/Behavior:
- Players alternate turns (X starts).
- You may not place a mark on an occupied cell.
- When a player places a fourth mark, their oldest mark disappears, keeping at most three of their marks on the board at all times.
- Win detection checks the current board state after each move.

Feel free to ask for enhancements (scorekeeping, AI opponent, animations, mobile polish).
