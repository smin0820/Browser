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


let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
})

function startGame() {
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
}

function stopGame() {
    stopGameTimer();
}

function showStopBtn() {
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
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
            return;
        }
        upDateTimeText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
    hideGameButton();
    showPopUpwithText('REPLAY?❓');
}

function upDateTimeText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes} : ${seconds}`;
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showPopUpwithText(text) {
    popMessage.innerHTML = text;
    popUp.classList.remove('pop-up--hide');
}

function initGame() {
    field.innerHTML = '';
    gameScore.innerHTML = CARROT_COUNT;
    // 벌레와 당근을 생성한뒤 field에 추가해줌
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
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