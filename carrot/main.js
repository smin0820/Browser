'use strict'

const carrot_size = 80;
const field = document.querySelector('.game__field');
// 요소의 크기 및 위치 정보를 가져오는 메서드
const fieldRect = field.getBoundingClientRect();

function initGame() {
    // 벌레와 당근을 생성한뒤 field에 추가해줌
    console.log(fieldRect);
    addItem('carrot', 5, 'img/carrot.png');
    addItem('bug', 5, 'img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    // absolute으로 인해 왼쪽 상단 모서리 기준으로
    // 당근과 벌레가 생성돼서 박스 밖으로 넘어가서
    // 당근 크기만큼 빼줌
    const x2 = fieldRect.width - carrot_size;
    const y2 = fieldRect.height - carrot_size;
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

initGame();