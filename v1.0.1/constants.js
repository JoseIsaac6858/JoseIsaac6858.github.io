
const $canvas = document.querySelector("canvas");
export const CONTEXT = $canvas.getContext("2d");
export const ROWS = 14;
export const COLS = 30;
// export const SIZE = 10;
// export const STROKE_SIZE = 1;
export const SIZE = Math.floor(Math.min(
    (window.innerHeight - ((COLS + 2) * 4)) / (COLS + 4),
    (window.innerWidth - ((ROWS + 2) * 4)) / (ROWS + 4),
));
export const STROKE_SIZE = SIZE > 15 ? 2 : 1;
export const SQUARE_SIZE = SIZE + (2 * STROKE_SIZE);
$canvas.width = ROWS * (SQUARE_SIZE);
$canvas.height = COLS * (SQUARE_SIZE);
$canvas.parentNode.style.width = `${$canvas.width}px`;
$canvas.parentNode.style.height = `${$canvas.height}px`;

CONTEXT.scale(1, 1);

export const COLORS = [
    "yellow", "red", "blue", "green", "cyan", "pink"
]
export const COLORS__STROKE = {
    "yellow": "#131313",
    "red": "#131313",
    "blue": "#131313",
    "green": "#131313",
    "cyan": "#131313",
    "pink": "#131313",
}

export const PIECES_TYPE = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    [
        [1, 0],
        [1, 1],
        [0, 1]
    ],
    [
        [0, 1],
        [1, 1],
        [1, 0]
    ],
    [
        [1, 1],
        [1, 0],
        [1, 0]
    ],
    [
        [1, 0],
        [1, 0],
        [1, 1]
    ],
]