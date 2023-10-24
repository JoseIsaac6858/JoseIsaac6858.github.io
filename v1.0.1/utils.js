import { CONTEXT, SIZE, SQUARE_SIZE, STROKE_SIZE } from "./constants.js";

export function randownInRange(min, max) {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);
    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

export function drawSquare({ x, y, color }) {
    const sqrx = getRealPosition(x);
    const sqry = getRealPosition(y);
    CONTEXT.fillStyle = color;
    CONTEXT.lineWidth = 0.1;
    CONTEXT.fillRect(sqrx, sqry, SIZE, SIZE);
}

function getRealPosition(x) {
    return (x * SQUARE_SIZE) + STROKE_SIZE;
}

export function drawStrokes({ color, squares, position: { x, y } }) {
    CONTEXT.beginPath();
    CONTEXT.lineWidth = STROKE_SIZE;
    CONTEXT.strokeStyle = color;
    squares.forEach((cols, sy) => {
        cols.forEach((square, sx) => {
            if (square === 1) {
                const rx = getRealPosition(x + sx);
                const ry = getRealPosition(y + sy);
                CONTEXT.rect(rx, ry, SIZE, SIZE);
            }
        });
    });
    CONTEXT.stroke();
    CONTEXT.closePath();
}
export function drawSolidSquare({ color, position: { x, y } }) {
    CONTEXT.beginPath();
    CONTEXT.lineWidth = STROKE_SIZE;
    CONTEXT.strokeStyle = color;
    CONTEXT.fillStyle = color;
    const rx = getRealPosition(x);
    const ry = getRealPosition(y);
    CONTEXT.rect(rx, ry, SIZE, SIZE);
    CONTEXT.stroke();
    CONTEXT.fill();
    CONTEXT.closePath();
}

export function drawSquares({ color, squares, position: { x, y } }) {
    CONTEXT.beginPath();
    CONTEXT.fillStyle = color;
    squares.forEach((cols, sy) => {
        cols.forEach((square, sx) => {
            if (square === 1) {
                const rx = getRealPosition(x + sx);
                const ry = getRealPosition(y + sy);
                CONTEXT.rect(rx, ry, SIZE, SIZE);
            }
        });
    });
    CONTEXT.fill();
    CONTEXT.closePath();
}

export function updateCustomCSSProperties() {
    const root = document.documentElement;
    root.style.setProperty("--stroke-width", `${STROKE_SIZE}px`);
    root.style.setProperty("--inner-square-width", `${SIZE}px`);
    root.style.setProperty("--outer-square-width", `${SQUARE_SIZE}px`);
}