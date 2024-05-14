document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskTitleInput = document.getElementById('task-title');
  const taskList = document.getElementById('task-list');

  // Event listener for form submission
  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    const title = taskTitleInput.value.trim();
    if (!title) {
      alert('Please enter a task title');
      return;
    }

    try {
      // Send a POST request to the server to create a new task
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title }) // Convert data to JSON format
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json(); // Parse response JSON
      taskTitleInput.value = ''; // Clear input field

      // Add the new task to the task list
      const taskItem = document.createElement('div');
      taskItem.textContent = newTask.title;
      taskList.appendChild(taskItem);
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred while creating the task');
    }
  });
});
