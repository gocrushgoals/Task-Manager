// This module exports several functions for formatting dates and numbers, and comparing values.

module.exports = {
    // This function takes a date as input and returns it formatted as MM/DD/YYYY.
    format_date: (date) => {
        // Add one hour to the date (3600000 milliseconds = 1 hour)
        date = new Date(date.getTime()+3600000);
        // Format the date as a locale string and return it
        return date.toLocaleDateString();
    },
    // This function takes a date as input and returns it formatted as YYYY-MM-DD.
    format_html_date: (date) => {
        // Get the year from the date
        const year = date.getFullYear();
        // Get the month from the date, add 1 (since months are 0-indexed), and pad with a leading 0 if necessary
        const month = String(date.getMonth() + 1).padStart(2, '0');
        // Get the day from the date and pad with a leading 0 if necessary
        const day = String(date.getDate()).padStart(2, '0');

        // Combine the year, month, and day into a string in the format YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;

        // Return the formatted date
        return formattedDate;
    },
    // This function takes a number as input and returns it formatted with commas.
    format_amount: (amount) => {
        // Convert the amount to an integer and format it as a locale string, which adds commas
        return parseInt(amount).toLocaleString();
    },
    // This function takes two values as input and returns 'selected' if they are equal, and an empty string otherwise.
    is_value_eq: (value1, value2) => {
        // Compare the two values for equality
        return value1 === value2 ? 'selected' : '';
    },
};
