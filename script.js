// Function to change the language and save preference to localStorage
function changeLanguage(language) {
    // Save the selected language to localStorage
    localStorage.setItem('language', language);
    loadLanguage(); // change the text selected language
}

// Function to load the language from localStorage
function loadLanguage() {
    // Get the language from localStorage 
    const language = localStorage.getItem('language') || 'en'; 

    // Change the language of the page based on the stored value
    if (language === 'fr') {
        document.documentElement.lang = 'fr'; // Set French

        document.getElementById('home-text').textContent = "Accueil";
        document.getElementById('movie-text').textContent = "Films";
        document.getElementById('reviews-text').textContent = "Critiques";
    } else {
        document.documentElement.lang = 'en'; // Set English

        document.getElementById('home-text').textContent = "Home";
        document.getElementById('movie-text').textContent = "Movies";
        document.getElementById('reviews-text').textContent = "Reviews";
    }
}

// Ensure language is loaded when the page is ready
window.onload = loadLanguage;


async function loadMovies() {
    const container = document.getElementById("movies-container");

    try {
        // Fetch the JSON file
        const response = await fetch('scrap/movies.json');
        const movies = await response.json();

        // Loop through each movie in the JSON and create a movie card
        movies.forEach(movie => {
            // Calculate the star rating (round to nearest whole number)
            const starRating = Math.round(movie.vote_average / 2); // Convert 10-point scale to 5-star scale
            const stars = "★".repeat(starRating) + "☆".repeat(5 - starRating);

            // Create the movie card HTML
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            movieCard.innerHTML = `
                <img src="${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p class="release-date">${movie.release_date}</p>
                <p class="overview">${movie.overview}</p>
                <p class="rating">${stars}</p>
            `;

            // Append the movie card to the container
            container.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

// Call the function to load and display movies
loadMovies();

