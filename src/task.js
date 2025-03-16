// The Tasklister operating as a form with dynamic characteristics
// Capturing the document loading, using preventDefault, 
        // creating functions to retrieve user inputs and using local storage
// The functions will create new elements, update inputs, delete, reset, and append

 //globally define priority colors
 const colorPriority = {
    'high': 'orange',
    'medium': 'blue',
    'low': 'green'
}

//allow DOM to load before initialization
document.addEventListener('DOMContentLoaded', () => {

    //access local storage for existing tasks
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    savedTasks.forEach(task => addTodos({ taskData: task, storageLoading: true}));
    document.querySelector('#create-task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addTodos(e);
    })
})

//Handling task lists
function addTodos(e) {

    //check if its a load from local storage or form submission
    const storageLoading = e.storageLoading || false;
    let addTask, addColor, addCategory, addPriority, addTime;

    if (storageLoading) {
        const task = e.taskData;
        addTask = task.newTask;
        addColor = task.toDoColor;
        addCategory = task.category.split(' ')[0];
        addPriority = task.priority;
        addTime = task.dueDate;
    } else { 
        const target = e.target
        addTask = target.newTask.value;
        addColor = target.toDoColor.value;
        addCategory = target.category.value;
        addPriority = target.priority.value;
        addTime = target.dueDate.value;
    }
    
    //besides the saved collection, skip if the tasks and date inputs are missing
    if(!addTask || !addTime)return 

    //add the task' wrapper
    const holdTask = document.createElement('div'); //
    holdTask.classList.add('task-wrapper');

    //add elements into the task' wrapper 
        //besides the 'h3' and date, other elements will be in a separate div
    const holdCreatedElements = document.createElement('div');
    holdCreatedElements.classList.add('elements-wrapper')

    const categoryHeader = document.createElement('h3');
    categoryHeader.textContent = addCategory;
    categoryHeader.style.backgroundColor = addColor;
 
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => showCompletion(currentTask));

    const currentTask = document.createElement('p');
    currentTask.textContent =addTask;
    currentTask.classList.add('element2')

    const handlePriority = document.createElement('h5')
    handlePriority.textContent = addPriority;
    handlePriority.classList.add('element3')
    handlePriority.style.color = colorPriority[addPriority]

    const handleDeadline = document.createElement('p');
    handleDeadline.textContent = addTime;
    handleDeadline.classList.add('element4')

    const allowTaskDelete = document.createElement('button');
    allowTaskDelete.textContent = 'X';
    allowTaskDelete.addEventListener('click', () => deleteTodo(holdTask));

    //append created elements into the task's wrapper
    holdCreatedElements.appendChild(checkbox);
    holdCreatedElements.appendChild(currentTask);
    holdCreatedElements.appendChild(handlePriority);
    holdCreatedElements.appendChild(allowTaskDelete);

    categoryHeader.appendChild(handleDeadline);

    holdTask.appendChild(categoryHeader);
    holdTask.appendChild(holdCreatedElements);

    //append the wrapper to HTML's 
    document.querySelector('#todos').appendChild(holdTask);

    //empty user input after a submit
    if (!storageLoading) {
        e.target.newTask.value ='';
        e.target.category.value='';
        e.target.priority.value='';
        e.target.dueDate.value='';
    }

    //saving tasks to local storage after every new input 
    const allTasks = Array.from(document.querySelectorAll('.task-wrapper')).map(wrapper => ({
        newTask: wrapper.querySelector('.element2').textContent,
        toDoColor: wrapper.querySelector('h3').style.backgroundColor,
        category: wrapper.querySelector('h3').firstChild.textContent 
        || wrapper.querySelector('h3').textContent, // Saving only category
        dueDate: wrapper.querySelector('.element4').textContent
    }));
    localStorage.setItem('tasks', JSON.stringify(allTasks));
}

//handling the checkbox event and delete button 
function showCompletion(taskValues) {
    taskValues.style.textDecoration = 
    taskValues.style.textDecoration === 'line-through' ? 'none': 'line-through'
}
function deleteTodo(taskWrapper) {
    taskWrapper.remove();

    //after deletion, save the updated tasks to local storage
    const allTasks = Array.from(document.querySelectorAll('.task-wrapper')).map(wrapper => ({
        newTask: wrapper.querySelector('.element2').textContent,
        toDoColor: wrapper.querySelector('h3').style.backgroundColor,
        category: wrapper.querySelector('h3').firstChild.textContent ||
        wrapper.querySelector('h3').textContent, // Save only category
        priority: wrapper.querySelector('.element3').textContent,
        dueDate: wrapper.querySelector('.element4').textContent
    }))
    localStorage.setItem('tasks', JSON.stringify(allTasks))
}