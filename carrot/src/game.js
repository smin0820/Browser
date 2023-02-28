'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel'
})

// Builder Patten
export class GameBulder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    bugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');

        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        })


        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopBtn();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }

    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === ItemType.carrot) {
            this.score++;
            this.upDateScoreBoard();
            if (this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else if (item === ItemType.bug) {
            this.stop(Reason.lose);
        }
    }

    showStopBtn() {
        const icon = this.gameBtn.querySelector('.fa-solid');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';

    }

    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }

    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.upDateTimeText(remainingTimeSec);
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.upDateTimeText(--remainingTimeSec);
        }, 1000)
    }

    stopGameTimer() {
        clearInterval(this.timer);
    }

    upDateTimeText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerHTML = `${minutes} : ${seconds}`;
    }

    initGame() {
        this.score = 0;
        this.gameScore.innerHTML = this.carrotCount;
        this.gameField.init();
    }

    upDateScoreBoard() {
        this.gameScore.innerHTML = this.carrotCount - this.score;
    }
}