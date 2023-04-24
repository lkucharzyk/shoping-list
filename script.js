const itemFrom = document.querySelector('#item-form');
const itemInput = itemFrom.querySelector('input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');

function addItem(e){
    e.preventDefault();

    const newItem = itemInput.value;

    function validateError(error){
        const errorEl = document.querySelector('.error');
        const errorMess = document.createElement('div');
        errorMess.innerText = error;
        errorEl.appendChild(errorMess);
        setTimeout(() => errorMess.remove(), 500);
    }

    if(newItem === ''){
        validateError('Please fill field');
        return;
    }
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    itemList.appendChild(li);

    const button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';
    li.appendChild(button);

    const i = document.createElement('i');
    i.className = 'fa-solid fa-xmark';
    button.appendChild(i);

}

function removeItem(e){
    if(e.target.parentElement.tagName === 'BUTTON'){
        e.target.parentElement.parentElement.remove();
    }
}

function clearItems(){
    while (itemList.lastChild){
        itemList.lastChild.remove();
    }
}

itemFrom.addEventListener('submit',addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
