
//Search Filter
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');

    function filterBooks() {
        const searchQuery = searchInput.value.toLowerCase();
        const books = document.querySelectorAll('#books-container #book');

        books.forEach(book => {
            const title = book.querySelector('h2').textContent.toLowerCase();
            const author = book.querySelector('h4').textContent.toLowerCase();

            if (title.includes(searchQuery) || author.includes(searchQuery)) {
                book.hidden = false;
            } else {
                book.hidden = true;
            }
        });
    }

    searchInput.addEventListener('input', filterBooks);
});

// Dark Mode Toggle Button
const themeToggle = document.getElementById("theme-toggle");

// Function to apply the theme
function applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute("data-bs-theme", theme);

    // Update the button icon and style
    const newIcon =
        theme === "dark"
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 18"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 18"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>`;

    const newButton = theme === "dark" ? "btn-outline-light" : "btn-outline-dark";
    const oldButton = theme === "dark" ? "btn-outline-dark" : "btn-outline-light";

    themeToggle.innerHTML = newIcon;
    themeToggle.classList.remove(oldButton);
    themeToggle.classList.add(newButton);
}

// Load the saved theme from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light"; // Default to light theme
    applyTheme(savedTheme);
});

// Toggle the theme and save it to localStorage
themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);

    // Save the new theme to localStorage
    localStorage.setItem("theme", newTheme);
});