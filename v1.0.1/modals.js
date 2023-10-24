const $cover = document.getElementById("modal-cover");
const $endgame = document.getElementById("modal-endgame");
const $score = document.getElementById("modal-endgame-score");

export function hideCover() {
    $cover.style.display = "none";
}
export function showCover() {
    $cover.style.display = "";
}
export function newEndgameModal({ score }) {
    $endgame.style.display = "";
    $score.innerText = String(score);
}
export function hideEndgameModal() {
    $endgame.style.display = "none";
}