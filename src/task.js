// The Tasklister operating as a form with dynamic characteristics
// Capturing the document loading, using preventDefault and creating a function to retrieve user inputs
// The function will create new elements, update inputs, delete, reset, and append

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#create-task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addTodos(e);
    })
})

//Handling task lists
function addTodos(e) {
    const addTask = e.target.newTask.value;
    const addColor = e.target.toDoColor.value;
    const addCategory = e.target.category.value;
    const addPriority = e.target.priority.value;
    const addTime = e.target.dueDate.value;

    if(!addTask) return; //avoiding empty tasks 

    //Highlighting colors
    const colorPriority = {
        'high': 'red',
        'medium': 'blue',
        'low': 'green'
    }

    //add the task' wrapper
    const holdTask = document.createElement('div'); //
    holdTask.classList.add('task-wrapper');

    //add elements into the task' wrapper 
        //besides the 'h3', other elements will be in a separate div
    const holdCreatedElements = document.createElement('div');
    holdCreatedElements.classList.add('elements-wrapper')

    const categoryHeader = document.createElement('h3');
    categoryHeader.textContent = addCategory;
    categoryHeader.style.backgroundColor = addColor;
 
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('element')
    checkbox.addEventListener('change', () => showCompletion(currentTask));

    const currentTask = document.createElement('p');
    currentTask.textContent =addTask;
    currentTask.classList.add('element2')

    const handlePriority = document.createElement('h5')
    handlePriority.textContent = addPriority;
    handlePriority.classList.add('element')
    handlePriority.style.color = colorPriority[addPriority]

    const handleDeadline = document.createElement('p');
    handleDeadline.textContent = addTime;
    handleDeadline.classList.add('element')

    const allowTaskDelete = document.createElement('button');
    allowTaskDelete.textContent = 'X';
    allowTaskDelete.classList.add('element')
    allowTaskDelete.addEventListener('click', () => deleteTodo(holdTask));

    //append created elements into the task's wrapper
    holdCreatedElements.appendChild(checkbox);
    holdCreatedElements.appendChild(currentTask);
    holdCreatedElements.appendChild(handlePriority);
    holdCreatedElements.appendChild(handleDeadline);
    holdCreatedElements.appendChild(allowTaskDelete);

    holdTask.appendChild(categoryHeader);
    holdTask.appendChild(holdCreatedElements);

    //append the wrapper to HTML's 
    document.querySelector('#todos').appendChild(holdTask);

    //empty user input after a submit
    e.target.newTask.value ='';
};

//handling the checkbox event and delete button 
function showCompletion(taskValues) {
    taskValues.style.textDecoration = 
    taskValues.style.textDecoration === 'line-through' ? 'none': 'line-through'
}
function deleteTodo(taskWrapper) {
    taskWrapper.remove();
}