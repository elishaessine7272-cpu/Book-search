// Select HTML elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const results = document.getElementById("results");


// Create search function
async function searchBooks() {

    // Get the value from the input
    const searchTerm = searchInput.value.trim();

    // Check if input is empty
    if (searchTerm === "") {
        message.textContent = "Please enter a book name.";
        return;
    }

    // Clear previous results
    results.innerHTML = "";

    // Show loading message
    message.textContent = "Loading books ...";

    try {

        // Create API URL
        const url = `https://openlibrary.org/search.json?q=${searchTerm}`;

        // Send request
        const response = await fetch(url);

        // Convert response to JSON
        const data = await response.json();

        // Get books
        const books = data.docs;

        // Check if there are no books
        if (books.length === 0) {
            message.textContent = "No books found.";
            return;
        }

        // Display only 10 books
        const tenBooks = books.slice(0, 10);

        // Display each book
        tenBooks.forEach(function(book) {

            const title = book.title || "Unknown";

            const author = book.author_name
                ? book.author_name[0]
                : "Unknown";

            const year = book.first_publish_year || "Unknown";

            results.innerHTML += `
                <div class="book-card">
                    <h2>${title}</h2>
                    <p>Author: ${author}</p>
                    <p>First Published: ${year}</p>
                </div>
            `;
        });

        // Update message
        message.textContent = "Books found!";

    } catch (error) {

        // Show error message
        message.textContent =
            "Something went wrong. Please try again.";
    }
}


// Run search when button is clicked
searchBtn.addEventListener("click", searchBooks);