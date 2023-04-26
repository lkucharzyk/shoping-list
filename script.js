const itemFrom = document.querySelector('#item-form');
const itemInput = itemFrom.querySelector('input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const confirmEl = document.querySelector('#confirm');
const formBtn = itemFrom.querySelector('button');

let editMode = false;

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) =>addItemtoDOM(item));
    checkUI();

}


function addItem(e){
    e.preventDefault();

    const newItem = itemInput.value;

    function validateError(error){
        const errorEl = document.querySelector('.error');
        const errorMess = document.createElement('div');
        errorMess.innerText = error;
        errorEl.appendChild(errorMess);
        setTimeout(() => errorMess.remove(), 1500);
    }

    if(checkIfitemExist(newItem)){
        validateError('Please add item with unique name');
        return;
    }

    if(newItem === ''){
        validateError('Please fill field');
        return;
    }

    if(editMode){
        const item = itemList.querySelector('.edit-mode');
        removeItem(item);
        editMode = false;
        formBtn.style.backgroundColor = '#333';
        itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'));
        formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    }
    
    addItemtoDOM(newItem);
    addItemToStorage(newItem);

    checkUI()
    itemInput.value = '';
}

function getItemsFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function addItemtoDOM(item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    itemList.appendChild(li);

    const button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';
    li.appendChild(button);

    const i = document.createElement('i');
    i.className = 'fa-solid fa-xmark';
    button.appendChild(i);
}

function onClickItem(e){
    if(e.target.parentElement.tagName === 'BUTTON'){
        const li = e.target.parentElement.parentElement;
        removeItem(li);
    }else{
        editItemSet(e.target);
    }
}

function checkIfitemExist(item){
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function removeItem(item){
    function confirmation(item){
        const confirmMess = document.createElement('div');
        if(!confirmEl.hasChildNodes()){
            confirmMess.innerText = "Click X angain to confirm";
            confirmEl.appendChild(confirmMess);
        }

        item.setAttribute('clickedFirst', 'true');
        item.classList.add('to-remove');

        setTimeout(()=>{
            confirmMess.remove();
            item.removeAttribute('clickedFirst');
            item.classList.remove('to-remove');
        }, 1500);

   
    }

    if(item.classList.contains('edit-mode') || item.getAttribute('clickedFirst')){
        let itemsFromStorage = getItemsFromStorage();
        const ItemName = item.innerText.toLowerCase();
        itemsFromStorage.splice(itemsFromStorage.indexOf(ItemName), 1);
        localStorage.setItem('items', JSON.stringify(itemsFromStorage));

        item.remove();
    }else{
        confirmation(item);
    }
    checkUI()
}

function editItemSet(item){
    editMode = true;

    itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Edit item';
    formBtn.style.backgroundColor = 'rgb(82, 82, 255)';
    itemInput.value = item.textContent;
}

function clearItems(){
    while (itemList.lastChild){
        itemList.lastChild.remove();
    }
    localStorage.removeItem('items');
    checkUI()
}

function checkUI(){
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";

    }else{
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }
}

function filterItems(){
    const input =  itemFilter.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        if(!item.innerText.toLowerCase().startsWith(input)){
            item.style.display = 'none';
        }else{
            item.style.display = 'flex';
        }
    });
}

function init(){
    itemFrom.addEventListener('submit',addItem);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('keyup', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();