// Select all elements with the class 'progress'
const progress = document.querySelectorAll('.progress');

// Loop through each item in the 'progress' NodeList
progress.forEach(item => {
    // If the text content of the item is '1'
    if(item.textContent === '1') {
        // Change the text content to 'Not started'
        item.textContent = 'Not started';
    } 
    // If the text content of the item is '2'
    else if (item.textContent === '2'){
        // Change the text content to 'In progress'
        item.textContent = 'In progress';
    } 
    // If the text content of the item is neither '1' nor '2'
    else {
        // Change the text content to 'Completed'
        item.textContent = 'Completed';
    }
});
