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

// Add these new functions at the start of script.js
// Read JSON file function
async function fetchUsers() {
    try {
        const response = await fetch('./login/login.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error loading users:', error);
        return [];
    }
}

// Login function
async function login() {
    const username = document.getElementById('logInUsername').value;
    const password = document.getElementById('logInPassword').value;

    // Input validation
    if (!username || !password) {
        alert('Please fill in all fields');
        return false;
    }

    try {
        const users = await fetchUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            alert('Invalid username or password');
            return false;
        }
        alert('Login successful!');
        // Store user info in localStorage
        user.loggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Role-based redirect
        if (user.role === 'admin') {
            window.location.href = './admin.html';
        } else {
            window.location.href = '../index.html';
        }

    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }

    return false;
}

// Sign in function
async function signin() {
    const email = document.getElementById('signInEmail').value;
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    if (!email || !username || !password) {
        alert('Please fill in all fields');
        return false;
    }

    try {
        const users = await fetchUsers();
        
        if (users.find(u => u.username === username)) {
            alert('Username already exists');
            return false;
        }

        const newUser = {
            email,
            username,
            password,
            role: 'user',
            loggedIn: true
        };

        users.push(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        alert('Sign up successful!');
        window.location.href = '../index.html';

    } catch (error) {
        console.error('Sign in error:', error);
        alert('An error occurred during sign up');
    }

    return false;
}

// Check if user is logged in
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = './login.html';
    }
    return currentUser;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = './login.html';
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

function togglePasswordVisibility(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}