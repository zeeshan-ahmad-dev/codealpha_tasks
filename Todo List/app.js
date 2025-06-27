const addBtn = document.querySelector("button");
const input = document.querySelector("input");
const todoContainer = document.querySelector(".todo-list");
let tasks = [];

storedTasks = localStorage.getItem('tasks');

if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    AddTasks();
}

function AddTasks() {
    tasks.forEach(task => {
        const text = task.text;
        const isComplete = task.isComplete;

        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span>${text}</span>
        <button class='delete'>Delete</button>`;

        if (isComplete) li.querySelector('span').classList.add('complete');
        todoContainer.appendChild(li);
        input.value = '';
    });
}

addBtn.addEventListener("click", addItem);
input.addEventListener('keydown',(e) => {
    if (e.key === 'Enter') {
        addItem();
    }
})

function addItem() {
    const value = input.value.trim(); 
    if (!value) return; 

    tasks.push({
        text: value,
        isComplete: false
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span>${value}</span>
    <button class='delete'>Delete</button>`;
    todoContainer.appendChild(li);
    input.value = '';
}

todoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        deleteItem(e);
    } else {
        const span = e.target.closest('li')?.querySelector('span');

        if (span) {
            span.classList.add('complete');
            const index = Array.from(todoContainer.children).indexOf(span.parentElement);
            tasks[index].isComplete = true;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
})

function deleteItem(e) {
    const itemToDelete = e.target.parentElement;
    const index = Array.from(todoContainer.children).indexOf(itemToDelete);
    
    console.log(index)
    tasks.splice(index, 1);
    itemToDelete.remove();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}