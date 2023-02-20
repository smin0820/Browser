'use strict';
import PopUp from './popup.js';
import GameBulder from './game.js';

const gameFinishBanner = new PopUp();

const game = new GameBulder()
    .gameDuration(7)
    .carrotCount(5)
    .bugCount(5)
    .build();

game.setGameStopListener(reason => {
    console.log(reason);
    let message;
    switch (reason) {
        case 'cancel':
            message = 'Replay?❓';
            break;
        case 'win':
            message = 'YOU WON😀';
            break;
        case 'lose':
            message = 'YOU LOST😂';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => {
    game.start();
})



