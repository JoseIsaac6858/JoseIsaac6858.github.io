//@ts-check
import Tetris from "./tetris.js";
import { updateCustomCSSProperties } from "./utils.js";

const GAME = new Tetris();
updateCustomCSSProperties();

window.addEventListener("keydown", (e) => {
    if (GAME.stop) return;
    switch (e.key) {
        case "ArrowLeft":
            GAME.piece.moveX(-1);
            break;
        case "ArrowRight":
            GAME.piece.moveX(1);
            break;
        case "ArrowDown":
            GAME.movePieceDown();
            break;
        case "ArrowUp":
            GAME.piece.rotate();
            break;
    }
})

window.addEventListener("keyup", (event) => {
    if (event.code === "KeyS") {
        GAME.togglePlay();
    }
})

const height = window.innerHeight;
const width = window.innerWidth;

// const _left = document.createElement("div");
// _left.style.width = `${(width / 2) - (width / 4)}px`;
// _left.style.height = "100vh";
// _left.style.top = "0";
// _left.style.left = "0";
// _left.style.position = "fixed";
// _left.style.background = "#0f0a";
// document.body.appendChild(_left);

// const _top = document.createElement("div");
// _top.style.width = "100vw";
// _top.style.height = `${(height / 2)}px`;
// _top.style.top = "0";
// _top.style.left = "0";
// _top.style.position = "fixed";
// _top.style.background = "#00fa";
// document.body.appendChild(_top);

// const _right = document.createElement("div");
// _right.style.width = `${(width / 2) - (width / 4)}px`;
// _right.style.height = "100vh";
// _right.style.top = "0";
// _right.style.right = "0";
// _right.style.position = "fixed";
// _right.style.background = "#f0fa";
// document.body.appendChild(_right);

// const _bottom = document.createElement("div");
// _bottom.style.width = "100vw";
// _bottom.style.height = `${(height / 2) + (height / 4)}px`;
// _bottom.style.top = "0";
// _bottom.style.left = "0";
// _bottom.style.position = "fixed";
// _bottom.style.background = "#0ffa";
// document.body.appendChild(_bottom);

window.addEventListener("click", (event) => {
    if (!GAME.stop) {
        if (event.pageX < (width / 2) - (width / 4)) {
            return GAME.piece.moveX(-1);
        }
        if (event.pageX > (width / 2) + (width / 4)) {
            return GAME.piece.moveX(1);
        }
        if (event.pageY > (height / 2) + (height / 4)) {
            return GAME.movePieceDown();
        }
        if (event.pageY < (height / 2)) {
            return GAME.piece.rotate();
        }
    }
    GAME.togglePlay();
})

let press = [];
function updatePress(index, foo) {
    clearInterval(press[index]);
    if (typeof foo === "function")
        press[index] = setInterval(() => {
            foo();
        }, 100);
}
window.addEventListener("touchstart", (event) => {
    if (GAME.stop) return;
    for (let index = 0; index < event.touches.length; index++) {
        const touch = event.touches[index];
        if (touch.pageX < (width / 2) - (width / 4)) {
            updatePress(index, () => GAME.piece.moveX(-1));
        }
        if (touch.pageX > (width / 2) + (width / 4)) {
            updatePress(index, () => GAME.piece.moveX(1));
        }
        if (touch.pageY > (height / 2) + (height / 4)) {
            updatePress(index, () => GAME.movePieceDown());
        }
        if (touch.pageY < (height / 2) - (height / 6)) {
            updatePress(index, () => GAME.piece.rotate());
        }
    }
})
window.addEventListener("touchend", (event) => {

    for (let index = 0; index < event.changedTouches.length; index++) {
        updatePress(event.changedTouches[0].identifier, null);
    }
});