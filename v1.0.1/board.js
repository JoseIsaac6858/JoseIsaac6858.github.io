import { COLS, ROWS } from "./constants.js";
import { drawSolidSquare } from "./utils.js";

function createBoard() {
    return Array(COLS).fill(Array(ROWS).fill(0)).map((col) => [...col]);
}

class Board {
    board;
    constructor() {
        this.board = createBoard();
    }
    draw() {
        this.board.forEach((col, y) => {
            col.forEach((square, x) => {
                if (typeof square === "object") {
                    drawSolidSquare({ color: square.color, position: { x, y } })
                }
            });
        });
    }
    solidifyPiece({ position: { x, y }, squares, color }) {
        squares.forEach((col, sy) => {
            col.forEach((square, sx) => {
                if (square === 1)
                    this.board[y + sy][x + sx] = { color };
            })
        });
    }
    clear() {
        let TO_REMOVE = [];
        this.board.forEach((COL, i) => {
            if (COL.every((sqr) => typeof sqr === "object")) {
                TO_REMOVE.push(i);
            }
        });
        TO_REMOVE.forEach((i) => {
            this.board.splice(i, 1);
            this.board.unshift(Array(ROWS).fill(0));
        });
        return TO_REMOVE;
    }
    restart() {
        this.board = createBoard();
    }
    
    checkCollition({ position: { x, y }, squares }) {
        const BOARD = this.board;
        return squares.some((col, sy) => {
            return col.some((square, sx) => {
                if (BOARD.length < y) console.log("<", y)
                return (
                    square === 1 &&
                    (!Array.isArray(BOARD[y + sy]) ||
                        BOARD[y + sy][x + sx] !== 0)
                );
            });
        });
    }

}

export default Board;