const $score = document.getElementById("score")
const $record = document.getElementById("record")
const localStorageRecordKey = "tetris_record_score";
let SCORE = 0;



export function carculateScore(columnsRemoved) {
    return columnsRemoved <= 0 ? 0 : (columnsRemoved * 15) + ((columnsRemoved - 1) * 5);
}

export function updateScore(input) {
    SCORE += input;
    $score.innerText = SCORE;
    tryUpdateRecord(SCORE);
}
export function restartScore() {
    $score.innerText = "0";
    $record.innerText = String(getRecord());
}

export function getScore() {
    return SCORE;
}
function getRecord() {
    return Number(window.localStorage.getItem(localStorageRecordKey)) || 0;
}

function setRecord(record) {
    window.localStorage.setItem(localStorageRecordKey, record);
}

function tryUpdateRecord(score) {
    const record = getRecord();
    if (score > record) {
        $record.innerText = String(score);
        setRecord(score);
        return;
    }
    $record.innerText = String(record);
}
