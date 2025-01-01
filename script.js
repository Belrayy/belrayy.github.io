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


        document.getElementById('movie-text').textContent = "Films";
        document.getElementById('reviews-text').textContent = "Critiques";
        document.getElementById('About').textContent = "À propos";
        document.getElementById('Apps').textContent = "Application";
        document.getElementById('Help').textContent = "Support";
        document.getElementById('API').textContent = "API";
        document.getElementById('Contact').textContent = "Contactez-nous";
        document.getElementById('copyright').textContent = "© LetterboxB Limited. Créé par BELHAFIANE RAYYANE. Données des films fournies par OMDb.";
        document.getElementById('Latest').textContent = "Récent :";
    } else {
        document.documentElement.lang = 'en'; // Set English


        document.getElementById('movie-text').textContent = "Movies";
        document.getElementById('reviews-text').textContent = "Reviews";
        document.getElementById('About').textContent = "About";
        document.getElementById('Apps').textContent = "Apps";
        document.getElementById('Help').textContent = "Help";
        document.getElementById('API').textContent = "API";
        document.getElementById('Contact').textContent = "Contact";
        document.getElementById('copyright').textContent = "© LetterboxB Limited. Made by BELHAFIANE RAYYANE. Film data from OMDb.";
        document.getElementById('Latest').textContent = "Latest Movies :";
    }
}

// Ensure language is loaded when the page is ready
window.addEventListener('DOMContentLoaded', (event) => {
    loadLanguage();
});

window.onload = loadLanguage;


async function loadMovies() {
    const container = document.getElementById("movies-container");

    try {
        // Fetch the JSON file
        const response = await fetch('../scrap/movies/cleaned_movies.json');
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


async function loadLatestMovies() {
    const container = document.getElementById("movies-latest");

    try {
        // Fetch the JSON file
        const response = await fetch('scrap/movies/cleaned_movies.json');
        const movies = await response.json();

        // Sort movies by release date (descending order)
        movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        // Get the 5 latest movies
        const latestMovies = movies.slice(0, 5);

        // Loop through each movie and create a movie card
        latestMovies.forEach(movie => {
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

// Call the function to load and display the latest movies
loadLatestMovies();

document.addEventListener('DOMContentLoaded', function() {
    function signin() {
        const username = document.getElementById('signInUsername').value;
        const password = document.getElementById('signInPassword').value;

        if (username && password) {
            const user = { username, password };
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('User signed up:', user); // Debugging log
            alert('User signed up successfully!');
            return true;
        } else {
            alert('Please fill in all fields.');
            return false;
        }
    }

    function login() {
        const username = document.getElementById('logInUsername').value;
        const password = document.getElementById('logInPassword').value;
    
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Stored users:', users); // Debugging log
        console.log('Entered username:', username); // Debugging log
        console.log('Entered password:', password); // Debugging log
    
        const user = users.find(user => user.username === username && user.password === password);
        console.log('Found user:', user); // Debugging log
    
        if (user) {
            console.log('User role:', user.role); // Debugging log
            if (user.role === "admin") {
                console.log('Redirecting to admin.html'); // Debugging log
                window.location.href = 'admin.html'; // Redirect to admin page
            } else {
                alert('Login successful!');
            }
            return true;
        } else {
            alert('Invalid username or password.');
            return false;
        }
    }

    function showSignInForm() {
        document.getElementById("signInForm").style.display = "block";
        document.getElementById("logInForm").style.display = "none";
        document.getElementById("overlayTitle").innerText = "Sign Up";
    }

    function showLogInForm() {
        document.getElementById("logInForm").style.display = "block";
        document.getElementById("signInForm").style.display = "none";
        document.getElementById("overlayTitle").innerText = "Log In";
    }

    // Attach functions to the global scope if needed
    window.signin = signin;
    window.login = login;
    window.showSignInForm = showSignInForm;
    window.showLogInForm = showLogInForm;
});
function togglePasswordVisibility(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}