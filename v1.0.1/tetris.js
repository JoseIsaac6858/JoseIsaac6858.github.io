import { COLS, CONTEXT, ROWS, SQUARE_SIZE } from "./constants.js";
import Board from "./board.js";
import { hideCover, hideEndgameModal, newEndgameModal, showCover } from "./modals.js";
import { updateScore, carculateScore, restartScore, getScore } from "./score.js";
import Piece from "./piece.js";

class Tetris {
    board = new Board();
    piece = new Piece({ board: this.board });
    stop = true;
    previusTime = 0;
    restartTime = true;
    end = true;
    velocity = 1000;
    current;
    constructor() {
        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
    }
    togglePlay() {
        this.stop = !this.stop;
        if (!this.current || this.end) {
            this.newGame();
        } else if (this.stop) showCover();
        if (!this.stop) hideCover();
    }
    update(time = 0) {
        if (!this.stop) {
            if (this.restartTime) {
                this.previusTime = time;
                this.restartTime = false;
            } else if ((time - this.previusTime) >= this.velocity) {
                this.previusTime = time;
                this.movePieceDown();
            }
        }
        if (!this.end)
            this.current = window.requestAnimationFrame(this.draw);
    }
    draw() {
        CONTEXT.clearRect(0, 0, ROWS * SQUARE_SIZE, COLS * SQUARE_SIZE)
        this.piece.draw();
        this.board.draw();
        requestAnimationFrame(this.update)
    }
    movePieceDown() {
        this.restartTime = true;
        this.piece.position.y++;
        if (this.piece.checkCollition()) {
            this.piece.position.y--;
            this.solidifyPiece();
        }
    }
    solidifyPiece() {
        this.board.solidifyPiece(this.piece);
        this.piece.restart();
        updateScore(carculateScore(this.board.clear().length));
        if (this.piece.checkCollition()) this.endGame();
    }
    newGame() {
        this.stop = false;
        this.end = false;
        this.previusTime = 0;
        this.restartTime = true;
        this.board.restart();
        this.piece.restart();
        hideCover();
        hideEndgameModal();
        restartScore();
        requestAnimationFrame(this.update);
    }

    endGame() {
        this.stop = true;
        this.end = true;
        this.previusTime = 0;
        this.restartTime = true;
        this.game = null;
        newEndgameModal({ score: getScore() });
    }
}

export default Tetris;