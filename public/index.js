function onDragStartHandler(ev) {
    console.log('onDragStartHandler:', ev.target.id);
    console.dir(ev.target, { depth: null, colors: true, showHidden: true });
    ev.dataTransfer.setData("data-card-id", ev.target.cardId);
    ev.dataTransfer.effectAllowed="move";
    }
    
function onDragOverHandler(ev) {
ev.preventDefault();
}
    
function onDropHandler(ev) {
ev.preventDefault();
ev.stopPropagation();
const posX = ev.clientX;
const posY = ev.clientY;
console.log(`Dropped at position (${posX}, ${posY})`);
console.log("onDropHandler:", ev.target.id);
console.dir(ev.target, { depth: null, colors: true, showHidden: true });
}

const cards = document.querySelectorAll(".card");
cards.forEach(card=>{
    card.addEventListener("dragstart", onDragStartHandler);
})

const lists = document.querySelectorAll(".list");
lists.forEach(list=>{
    list.addEventListener("dragover", onDragOverHandler);
    list.addEventListener("drop", onDropHandler);
})

const board = document.querySelector(".board");
board.addEventListener("dragover", onDragOverHandler);
board.addEventListener("drop", onDropHandler);

const menuButton = document.getElementById("menu");
const page = document.querySelector('.page');

menu.addEventListener('click', menuToggleHandler);

var isOpen = true;
function menuToggleHandler(ev){
    if (isOpen) {
        page.style.gridTemplateColumns='0px 1fr';
    } else {
        page.style.gridTemplateColumns='200px 1fr';
    }
    isOpen = !isOpen;
}