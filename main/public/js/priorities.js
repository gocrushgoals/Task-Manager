// Select all elements with the class 'priority'
const priorities = document.querySelectorAll('.priority');

// Loop through each item in the 'priorities' NodeList
priorities.forEach(item => {
    // If the text content of the item is 'true'
    if(item.textContent === 'true') {
        // Change the text content to 'High Priority'
        item.textContent = 'High Priority';
        // Add the class 'priority-color' to the item
        item.classList.add('priority-color')
    } else {
        // If the text content of the item is not 'true', change it to 'Low Priority'
        item.textContent = 'Low Priority';
    }
});
