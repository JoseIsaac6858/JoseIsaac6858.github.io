import { COLORS, PIECES_TYPE, ROWS } from "./constants.js";
import { drawSquares, drawStrokes, randownInRange } from "./utils.js";


class Piece {
    position;
    color;
    squares;
    placeholder = {
        piecePosition: { x: 0, y: 0 },
        position: { x: 0, y: 0 },
    }
    board;
    constructor({ initialPosition: { x, y } = { x: 0, y: 0 }, initialColor = "red", initialSquares = PIECES_TYPE[0], board } = {}) {
        this.position = { x, y }
        this.color = initialColor;
        this.squares = initialSquares;
        this.board = board;
        this.updatePlaceholder();
    }
    draw() {
        const { position, squares, color, } = this;
        drawSquares({ color, squares, position })
        this.drawPlaceholder();
    }
    drawPlaceholder() {
        const { position: currentPiecePosition, squares, color } = this;
        const { piecePosition } = this.placeholder;
        if (piecePosition.x !== currentPiecePosition.x) {
            this.updatePlaceholder();
            drawStrokes({ color, squares, position: this.placeholder.position });
            return;
        }
        drawStrokes({ color, squares, position: this.placeholder.position });
    }
    updatePlaceholder() {
        const { x, y } = this.position;
        const squares = this.squares;
        this.placeholder.position = { x, y };
        this.placeholder.piecePosition = { x, y };
        let collition = this.board.checkCollition({ position: this.placeholder.position, squares });
        while (!collition) {
            this.placeholder.position.y++
            collition = this.board.checkCollition({ position: this.placeholder.position, squares });
        }
        this.placeholder.position.y--
    }
    rotate(again = 0) {
        const { squares } = this;
        const newSquares = Array(squares[0].length).fill(1).map(() => []);
        squares.forEach((COL, x) => {
            COL.forEach((square, i) => {
                newSquares[i].unshift(square)
            })
        });
        this.squares = newSquares;
        if (again > 0) this.rotate(again - 1);
        else if (this.checkCollition()) {
            const { position: { x } } = this;
            if ((x + newSquares[0].length) >= ROWS) {
                this.position.x = ROWS - newSquares[0].length;
            } else {
                this.squares = squares;
            }
        }
        this.placeholder.piecePosition.x = -1;
    }
    checkCollition() {
        return this.board.checkCollition(this);
    }
    restart() {
        this.position.x = Math.floor(ROWS / 2);
        this.position.y = 0;
        this.squares = PIECES_TYPE[randownInRange(0, PIECES_TYPE.length - 1)];
        this.color = COLORS[randownInRange(0, COLORS.length - 1)]
        this.rotate(randownInRange(1, 3));
    }
    moveX(input) {
        const initialPosition = this.position.x;
        this.position.x = initialPosition + input;
        if (this.checkCollition()) {
            this.position.x = initialPosition;
        }
    }
}

export default Piece;