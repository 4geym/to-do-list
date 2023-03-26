function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    const newTask = createTaskElement(taskInput.value);
    taskList.appendChild(newTask);
    taskInput.value = '';

    saveTasksToLocalStorage();
}

function createTaskElement(taskTextContent) {
    const newTask = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = taskTextContent;
    taskText.className = 'task-text';
    newTask.appendChild(taskText);

    const taskButtons = document.createElement('div');
    taskButtons.className = 'task-buttons';

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = function() {
        taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? '' : 'line-through';
        saveTasksToLocalStorage();
    };
    taskButtons.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
        taskList.removeChild(newTask);
        saveTasksToLocalStorage();
    };
    taskButtons.appendChild(deleteButton);

    newTask.appendChild(taskButtons);

    return newTask;
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(task => {
        return {
            text: task.querySelector('.task-text').textContent,
            completed: task.querySelector('.task-text').style.textDecoration === 'line-through'   };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskList = document.getElementById('taskList');
        tasks.forEach(task => {
            const taskElement = createTaskElement(task.text);
            if (task.completed) {
                taskElement.querySelector('.task-text').style.textDecoration = 'line-through';
            }
            taskList.appendChild(taskElement);
        });
    }
    
    loadTasksFromLocalStorage();