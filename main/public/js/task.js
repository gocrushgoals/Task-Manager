// Get the task form element by its ID
const taskForm = document.querySelector('#task-form');

// Get the new task button element by its class
const newTaskBtn = document.querySelector('.show-create-task');

// Add an event listener to the new task button
// When the button is clicked, the 'hidden' class is removed from the task form
newTaskBtn.addEventListener('click', () => {
    taskForm.classList.remove('hidden');
});
