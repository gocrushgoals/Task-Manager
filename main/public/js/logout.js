// Define an asynchronous function named 'logout'
const logout = async () => {
    // Send a POST request to the '/api/users/logout' endpoint
    const response = await fetch('/api/users/logout', {
        method: 'POST', // Specify the method of the request as POST
        headers: { 'Content-Type': 'application/json' }, // Set the content type of the request to 'application/json'
    });

    // Check if the response is successful (status code is in the range 200-299)
    if (response.ok) {
        // If successful, redirect the user to the home page
        document.location.replace('/');
    } else {
        // If not successful, display an alert with the status text of the response
        alert(response.statusText);
    }
};

// Attach a 'click' event listener to the element with the id 'logout'
// When this element is clicked, the 'logout' function will be executed
document.querySelector('#logout').addEventListener('click', logout);
