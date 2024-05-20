// Wait until the HTML document is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Log a message to the console to confirm the script has loaded
    console.log('Create button script loaded');

    // Define a function to handle the "Create" button click event
    const handleCreate = async (event) => {
        // Check if the clicked element has the class 'new-task'
        if (event.target.matches('.new-task')) {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Get the values from the form fields
            const name = document.getElementById('task-name').value;
            const description = document.getElementById('task-description').value;
            const notification = document.getElementById('notify').checked;
            const priority = document.getElementById('priority').value;
            const due_date = new Date(document.getElementById('due-date').value);
            // Adjust the due date for timezone offset
            due_date.setTime(due_date.getTime()+due_date.getTimezoneOffset()*60000);

            // Create a new task object with the form field values
            const newTask = {
                name: name,
                description: description,
                notification: notification,
                priority: priority,
                due_date: due_date.toISOString(),
            };
            // Log the new task object to the console
            console.log (newTask);
            try {
                // Send a POST request to the '/api/task' endpoint with the new task object
                const response = await fetch('/api/task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTask)
                });

                // If the request was successful, redirect to the home page
                if (response.ok) {
                    document.location.href = '/';
                } else {
                    // If the request failed, log a message to the console
                    console.log('Failed to create task');
                }
            } catch (err) {
                // If an error occurred, log it to the console
                console.log(err);
            }
        }
    };

    // Get the "Create" button element
    const createButton = document.querySelector('.new-task');
    // If the "Create" button exists, add the click event listener
    if (createButton) {
        createButton.addEventListener('click', handleCreate);
        // Log a message to the console to confirm the event listener was added
        console.log('Event listener attached to "Create" button');
    } else {
        // If the "Create" button doesn't exist, log an error to the console
        console.error('Create button not found');
    }
});
