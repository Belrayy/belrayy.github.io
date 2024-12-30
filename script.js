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

/*const fs = require('fs');

// File to store user data
const logindb = './login/login.json';

// Helper function to read and parse JSON file
function readUsers() {
    if (!fs.existsSync(logindb)) {
        fs.writeFileSync(logindb, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(logindb, 'utf8'));
}

// Helper function to write data back to the JSON file
function writeUsers(users) {
    fs.writeFileSync(logindb, JSON.stringify(users, null, 2));
}

// Signup function
function signup(username, mail, password) {
    const users = readUsers();
    if (users.find(user => user.username === username)) {
        return 'Username already exists.';
    }
    users.push({ username, password, mail, loggedIn: false });
    writeUsers(users);
    return 'Signup successful.';
}

function signin(){
    let user=document.getElementById("signInUsername");
    let mail=document.getElementById("signInEmail");
    let password=document.getElementById("signInPassword");
    signup(user,mail,password);

}

// Login function
function login(username, password) {
    const users = readUsers();
    const user = users.find(user => user.username === username);
    if (!user) {
        return 'User does not exist.';
    }
    if (user.password !== password) {
        return 'Invalid password.';
    }
    user.loggedIn = true;
    writeUsers(users);
    return 'Login successful.';
}

function login_in(){
    let user=document.getElementById("signInUsername");
    let password=document.getElementById("signInPassword");
    login(user,password);

}

// Disconnect function
function disconnect(username) {
    const users = readUsers();
    const user = users.find(user => user.username === username);
    if (!user.loggedIn) {
        return 'User is not logged in.';
    }
    user.loggedIn = false;
    writeUsers(users);
    return 'User disconnected.';
}

// Simulating user state
let userLoggedIn = false;

// Select the sign-in/disconnect button
const authButton = document.getElementById('connexion');

// Function to update the button's text and behavior
function updateAuthButton() {
    if (userLoggedIn) {
        authButton.textContent = 'Disconnect';
        authButton.onclick = disconnectUser; // Attach disconnect function
    } else {
        authButton.textContent = 'Sign In';
        authButton.onclick = loginUser; // Attach login function
    }
}

// Simulate login action
function loginUser() {
    userLoggedIn = true; // Simulate successful login
    updateAuthButton(); // Update button after login
    alert('You are now signed in!');
}

// Simulate disconnect action
function disconnectUser() {
    userLoggedIn = false; // Simulate disconnect
    updateAuthButton(); // Update button after disconnect
    alert('You are now disconnected!');
}

// Initialize the button state on page load
updateAuthButton();*/


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

