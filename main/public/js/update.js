// This script waits for the DOM content to be fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
    // Log to the console that the DOM content has been loaded
    console.log('DOM content loaded');

    // This function handles the click event on the "Edit" button
    const handleEdit = (event) => {
        // If the event target matches the "Edit" button within the task list
        if (event.target.matches('.task-list .edit-button')) {
            // Get the data-id attribute of the event target
            const id = event.target.getAttribute('data-id');
            // Redirect the page to the edit page for the task with the given id
            document.location.replace(`/edit/${id}`);
        }
    };

    // This function handles the click event on the "Update" button
    const handleUpdate = async (event) => {
        // If the event target is the "Update" button
        if (event.target.matches('.update-button')) {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Get the data-id attribute of the event target
            const id = event.target.getAttribute('data-id');
            // Get the values of the task fields from the form
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const priority = document.getElementById('priority').value;
            // const progress = document.getElementById('progress').value;
            const dueDate = document.getElementById('due-date').value;

            // Create an object representing the updated task
            const updatedTask = {
                id: id,
                name: name,
                description: description,
                priority: priority,
                progress: progress,
                dueDate: dueDate
            };
            // Log the updated task to the console
            console.log(updatedTask);
            // Try to perform the update logic (e.g., make an API request, update the database)
            try {
                // Send a PUT request to the server to update the task
                const response = await fetch(`/api/task/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedTask)
                });

                // If the response is OK
                if (response.ok) {
                    // Redirect to the task details page
                    document.location.href = `/task/${id}`;
                } else {
                    // Log an error message to the console
                    console.log('Failed to update task');
                }
            } catch (err) {
                // Log any errors to the console
                console.log(err);
            }
        }
    };

    // Add event listeners to the "Edit" and "Update" buttons
    const editButton = document.querySelector('.task-list');
    if (editButton) {
        // If the "Edit" button exists, add a click event listener to it
        editButton.addEventListener('click', handleEdit);
        // Log to the console that the event listener has been attached
        console.log('Event listener attached to "Edit" button');
    }

    const updateButton = document.querySelector('.update-button');
    if (updateButton) {
        // If the "Update" button exists, add a click event listener to it
        updateButton.addEventListener('click', handleUpdate);
        // Log to the console that the event listener has been attached
        console.log('Event listener attached to "Update" button');
    }
});
