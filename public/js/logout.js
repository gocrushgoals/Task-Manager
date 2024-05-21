// Function to handle user logout by making a POST request to the logout route
const logout = async () => {
    // Send a POST request to the logout route
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    // Redirect to the homepage if logout is successful, otherwise show an alert
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// Add a click event listener to the logout button to trigger the logout function
document.querySelector('#logout').addEventListener('click', logout);