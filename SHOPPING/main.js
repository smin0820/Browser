const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

function onAdd() {
    const text = input.value;
    if (text === '') {
        input.focus();
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({ block: 'center' });
    input.value = '';
    input.focus();
};

let id = 0; // UUTD를 사용하는게 더 바람직함
function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');
    itemRow.innerHTML = `
        <div class="item" data-id=${id}>
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="fa-solid fa-trash-can" data-id=${id}></i>
            </button>
        </div>
        `;
    id++;
    return itemRow;
};

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keydown', event => {
    if (event.isComposing) {
        return;
    }
    if (event.key === 'Enter') {
        onAdd();
    }
});

items.addEventListener('click', event => {
    const id = event.target.dataset.id;
    if (id) {
        const toBeDeleted = document.querySelector(`.item[data-id="${id}"]`);
        toBeDeleted.remove();
    }
})
