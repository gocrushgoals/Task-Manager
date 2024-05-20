// Define an asynchronous function to handle login form submission
const loginFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Collect email and password values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // If both email and password are provided
    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If the response is successful, redirect the browser to the profile page
        if (response.ok) {
            document.location.replace('/');
        } else {
            // If the response is not successful, alert the response status text
            alert(response.statusText);
        }
    }
};

// Define an asynchronous function to handle signup form submission
const signupFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Collect name, email, and password values from the signup form
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // If name, email, and password are provided
    if (name && email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If the response is successful, redirect the browser to the profile page
        if (response.ok) {
            document.location.replace('/');
        } else {
            // If the response is not successful, alert the response status text
            alert(response.statusText);
        }
    }
};

// Add an event listener to the login form that triggers the loginFormHandler function upon form submission
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

// Add an event listener to the signup form that triggers the signupFormHandler function upon form submission
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
