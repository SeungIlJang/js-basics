const todoForm = document.querySelector(".js-toDoForm");
const toDoInput = todoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS ="toDos";
let toDos = [];

function deleteToDo(event) {
    // console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){return toDo.id !==parseInt(li.id)});
    toDos = cleanToDos;
    saveToDos();
}
function saveToDos() {
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText="❌";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length+1;
    span.innerText=text;
    li.id = newId;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    const toDoOjb = {
        text: text,
        id: newId
    };
    toDos.push(toDoOjb);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos!==null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function (item) {
            // console.log(item);
            paintToDo(item.text);
        });

    }
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit",handleSubmit);
}

init();

