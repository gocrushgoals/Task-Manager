// This event listener waits for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    // Log to the console that the delete button script has been loaded
    console.log('Delete button script loaded');

    // This function handles the "Delete" button click event
    const handleDelete = async (event) => {
        // Check if the clicked element is a delete button
        if (event.target.matches('.delete-button')) {
            // Get the id of the task to be deleted from the button's data-id attribute
            const id = event.target.getAttribute('data-id');

            try {
                // Send a DELETE request to the server to delete the task with the given id
                const response = await fetch(`/api/task/${id}`, {
                    method: 'DELETE'
                });

                // If the response is ok, redirect to the task list
                if (response.ok) {
                    document.location.href = '/';
                } else {
                    // If the response is not ok, log an error message to the console
                    console.log('Failed to delete task');
                }
            } catch (err) {
                // If an error occurs during the fetch operation, log the error to the console
                console.log(err);
            }
        }
    };

    // Get all delete buttons in the document
    const deleteButtons = document.querySelectorAll('.delete-button');
    // Add the delete event listener to each delete button
    deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDelete);
    });

    // Log to the console that the event listener has been attached to the delete buttons
    console.log('Event listener attached to "Delete" buttons');
});
