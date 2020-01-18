const toDoList = [];

const input = document.querySelector('input');
const ul = document.querySelector('ul');
const listItems = document.getElementsByClassName('task');

const form = document.querySelector('form');
const taskNumber = document.querySelector('h1 span');

const renderList = () => {
    toDoList.forEach((toDoElement, key) => {
        toDoElement.dataset.key = key;
        ul.appendChild(toDoElement);
    })
}

const removeTask = (e) => {
    e.target.parentNode.remove();
    const index = e.target.parentNode.dataset.key;
    toDoList.splice(index, 1);
    taskNumber.textContent = listItems.length;
    renderList();
    toDoList.forEach((toDoElement, key) => {
        toDoElement.dataset.key = key;
        ul.appendChild(toDoElement);
    })
}

const addTask = (e) => {
    e.preventDefault();
    const titleTask = input.value;
    if (titleTask === "") return;
    const task = document.createElement('li');
    task.className = 'task';
    task.innerHTML = titleTask + "<button>Usuń</button>";
    toDoList.push(task);
    ul.textContent = "";
    renderList();


    ul.appendChild(task);
    input.value = "";
    // const liItems = document.querySelectorAll('li.task').length;
    taskNumber.textContent = listItems.length;

    task.querySelector('button').addEventListener('click', removeTask);
}
form.addEventListener('submit', addTask);