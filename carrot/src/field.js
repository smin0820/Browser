'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug'
})

export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        // 요소의 크기 및 위치 정보를 가져오는 메서드
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', (event) => this.onClick(event));
    }

    init() {
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        // absolute으로 인해 왼쪽 상단 모서리 기준으로
        // 당근과 벌레가 생성돼서 박스 밖으로 넘어가서
        // 당근 크기만큼 빼줌
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;

        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    onClick(event) {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
