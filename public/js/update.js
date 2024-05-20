document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');

    // Handler for "Edit" button click
    const handleEdit = (event) => {
        if (event.target.matches('.task-list .edit-button')) {
            const id = event.target.getAttribute('data-id');
            document.location.replace(`/edit/${id}`);
        }
    };

    // Handler for "Update" button click
    const handleUpdate = async (event) => {
        if (event.target.matches('.update-button')) {
            event.preventDefault();

            const id = event.target.getAttribute('data-id');
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const priority = document.getElementById('priority').value;
            const dueDateInput = document.getElementById('due-date'); // Get the input element

            // Update the dueDate when the user selects a new date
            const updatedDueDate = dueDateInput.value; // Get the selected date
            const newUpdatedDate = new Date(new Date(updatedDueDate).getTime() + 24 * 60 * 60 * 1000);

            const updatedTask = {
                id: id,
                name: name,
                description: description,
                priority: priority,
                due_date: newUpdatedDate
            };
            console.log(updatedTask); // Log the entire updatedTask object

            // Perform the update logic (e.g., make an API request, update the database)
            try {
                const response = await fetch(`/api/task/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedTask)
                });

                if (response.ok) {
                // Redirect to task details page
                    document.location.href = `/task/${id}`;
                } else {
                    console.log('Failed to update task');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Add event listeners
    const editButton = document.querySelector('.task-list');
    if (editButton) {
        editButton.addEventListener('click', handleEdit);
        console.log('Event listener attached to "Edit" button');
    }

    const updateButton = document.querySelector('.update-button');
    if (updateButton) {
        updateButton.addEventListener('click', handleUpdate);
        console.log('Event listener attached to "Update" button');
    }

});