'use strict'

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAEM_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
// 요소의 크기 및 위치 정보를 가져오는 메서드
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popRefresh = document.querySelector('.pop-up__refresh');
const popMessage = document.querySelector('.pop-up__message');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');



let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
})

popRefresh.addEventListener('click', () => {
    startGame();
    hidePopup();
})

function startGame() {
    started = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpwithText('REPLAY?❓');
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpwithText(win ? 'YOU WON😀' : 'YOU LOST😂');
}

function showStopBtn() {
    const icon = gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';

}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAEM_DURATION_SEC;
    upDateTimeText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        upDateTimeText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}

function upDateTimeText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes} : ${seconds}`;
}

function showPopUpwithText(text) {
    popMessage.innerHTML = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopup() {
    popUp.classList.add('pop-up--hide');
}

function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerHTML = CARROT_COUNT;
    // 벌레와 당근을 생성한뒤 field에 추가해줌
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        target.remove();
        score++;
        playSound(carrotSound);
        upDateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        finishGame(false);
    }
}

function playSound(sound) {
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function upDateScoreBoard() {
    gameScore.innerHTML = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    // absolute으로 인해 왼쪽 상단 모서리 기준으로
    // 당근과 벌레가 생성돼서 박스 밖으로 넘어가서
    // 당근 크기만큼 빼줌
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}