const itemFrom = document.querySelector('#item-form');
const itemInput = itemFrom.querySelector('input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('.filter');
const confirmEl = document.querySelector('#confirm'); 


function addItem(e){
    e.preventDefault();

    const newItem = itemInput.value;

    function validateError(error){
        const errorEl = document.querySelector('.error');
        const errorMess = document.createElement('div');
        errorMess.innerText = error;
        errorEl.appendChild(errorMess);
        setTimeout(() => errorMess.remove(), 1000);
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

    checkUI()

}

function removeItem(e){
    const li = e.target.parentElement.parentElement;
    function confirmation(e){
        const confirmMess = document.createElement('div');
        if(!confirmEl.hasChildNodes()){
            confirmMess.innerText = "Click X angain to confirm";
            confirmEl.appendChild(confirmMess);
        }

        e.target.setAttribute('clickedFirst', 'true');
        li.classList.add('to-remove');

        setTimeout(()=>{
            confirmMess.remove();
            e.target.removeAttribute('clickedFirst');
            li.classList.remove('to-remove');
        }, 1500);

   
    }

    if(e.target.parentElement.tagName === 'BUTTON'){
        if(e.target.getAttribute('clickedFirst')){
            li.remove();
        }else{
            confirmation(e);
        }
    }
    checkUI()
}

function clearItems(){
    while (itemList.lastChild){
        itemList.lastChild.remove();
    }
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

itemFrom.addEventListener('submit',addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI()
