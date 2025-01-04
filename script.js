let loggedIn = 0;

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
        document.getElementById('login-link').textContent = "S'inscrire/Se connecter";
        document.getElementById('signInBtn').textContent = "S'inscrire";
        document.getElementById('logInBtn').textContent = "Se connecter";
        document.getElementById('signInUsername').textContent = "Pseudo";
        document.getElementById('signInPassword').textContent = "Mot de passe";
        document.getElementById('showUpPassword').textContent = "Montrer le mot de passe";
        document.getElementById('signup').textContent = "S'inscrire";
        document.getElementById('logInUsername').textContent = "Pseudo";
        document.getElementById('logInPassword').textContent = "Mot de passe";
        document.getElementById('showUpPassword').textContent = "Montrer le mot de passe";
        document.getElementById('login').textContent = "Se connecter";
        document.getElementById('closeOverlayBtn').textContent = "Quitter";
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
        document.getElementById('login-link').textContent = "Sign-in/Log in";
        document.getElementById('signInBtn').textContent = "Sign-in";
        document.getElementById('logInBtn').textContent = "Log in";
        document.getElementById('signInUsername').textContent = "Username";
        document.getElementById('signInPassword').textContent = "Password";
        document.getElementById('showUpPassword').textContent = "Show Password";
        document.getElementById('signup').textContent = "Sign-in";
        document.getElementById('logInUsername').textContent = "Username";
        document.getElementById('logInPassword').textContent = "Password";
        document.getElementById('showUpPassword').textContent = "Show Password";
        document.getElementById('loginBtn').textContent = "Log in";
        document.getElementById('closeOverlayBtn').textContent = "Close";
    }


    const loginLink = document.getElementById('login-link');
    if (loggedIn === 1) {
        console.log('Logged in as user'); // Debugging log
        loginLink.innerHTML = `<button onclick="logout()">Logout</button>`;
    } else if (loggedIn === 0) {
        loginLink.innerHTML = `<a href="./login/login.html">Sign-in/Log in</a>`;
    }
}

// Ensure language is loaded when the page is ready
window.addEventListener('DOMContentLoaded', (event) => {
    loadLanguage();
});

window.onload = loadLanguage;

function convertDateFormat(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
}

async function loadMoviesToLocalStorage() {
    const lang = localStorage.getItem('language') || 'en';
    const jsonFile = lang === 'fr' ? '../scrap/movies/cleaned_movies_fr.json' : '../scrap/movies/cleaned_movies.json';

    try {
        // Fetch the JSON file
        const response = await fetch(jsonFile);
        const movies = await response.json();

        // Save movies to localStorage
        localStorage.setItem(jsonFile, JSON.stringify(movies));
    } catch (error) {
        console.error("Error loading movies to localStorage:", error);
    }
}


async function loadMovies() {
    const container = document.getElementById("movies-container");
    const lang = localStorage.getItem('language') || 'en';
    const jsonFile = lang === 'fr' ? 'cleaned_movies_fr.json' : 'cleaned_movies.json';
    const sortOption = document.getElementById('sortMovies').value;

    try {
        // Get movies from localStorage
        const movies = JSON.parse(localStorage.getItem(jsonFile)) || [];

        // Log the movies to debug
        console.log('Movies before sorting:', movies);

        // Convert release_date format for each movie
        movies.forEach(movie => {
            if (movie.release_date) {
                movie.release_date = convertDateFormat(movie.release_date);
            }
        });

        // Sort movies based on the selected option
        switch (sortOption) {
            case 'dateAsc':
                movies.sort((a, b) => {
                    const dateA = new Date(a.release_date);
                    const dateB = new Date(b.release_date);
                    console.log('Sorting by dateAsc:', dateA, dateB); // Debugging log
                    return dateA - dateB;
                });
                break;
            case 'dateDesc':
                movies.sort((a, b) => {
                    const dateA = new Date(a.release_date);
                    const dateB = new Date(b.release_date);
                    console.log('Sorting by dateDesc:', dateA, dateB); // Debugging log
                    return dateB - dateA;
                });
                break;
            case 'reviewsAsc':
                movies.sort((a, b) => a.vote_average - b.vote_average);
                break;
            case 'reviewsDesc':
                movies.sort((a, b) => b.vote_average - a.vote_average);
                break;
            default:
                // Default sorting (if any)
                break;
        }

        // Log the movies after sorting to debug
        console.log('Movies after sorting:', movies);

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
// loadMovies();


async function loadLatestMovies() {
    const container = document.getElementById("movies-latest");
    const lang = localStorage.getItem('language') || 'en';
    const jsonFile = lang === 'fr' ? 'cleaned_movies_fr.json' : 'cleaned_movies.json';

    try {
        // Get movies from localStorage
        const movies = JSON.parse(localStorage.getItem(jsonFile)) || [];

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
        console.error("Error loading latest movies:", error);
    }
}

// Call the function to load and display the latest movies
// loadLatestMovies();

document.addEventListener('DOMContentLoaded', function () {
    function signin() {
        const username = document.getElementById('signInUsername').value;
        const password = document.getElementById('signInPassword').value;
        const mail = document.getElementById('signInEmail').value;

        if (username && password) {
            const user = { username, password, mail, role: 'user' };
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

    async function loadUsers() {
        try {
            const response = await fetch('./login.json');
            const users = await response.json();
            localStorage.setItem('users', JSON.stringify(users));
            //console.log('Users loaded into localStorage:', users); // Debugging log
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    // Call the function when the page loads



    let userloggedIn;

    function login() {
        window.onload = loadUsers;
        const username = document.getElementById('logInUsername').value;
        const password = document.getElementById('logInPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Stored users:', users); // Debugging log
        console.log('Entered username:', username); // Debugging log
        console.log('Entered password:', password); // Debugging log

        const user = users.find(user => user.username === username && user.password === password);
        console.log('Found user:', user); // Debugging log

        if (user) {
            // console.log('User role:', user.role); // Debugging log
            if (user.role === "admin") {
                loggedIn = 1;
                console.log('Redirecting to admin.html'); // Debugging log
                window.location.href = './admin.html'; // Redirect to admin page
                alert('Login admin!');

            } else {
                loggedIn = 2;
                window.location.href = '../index.html';
                alert('Login successful!');
            }
            userloggedIn = user;
            return true;
        } else {
            alert('Invalid username or password.');
            return false;
        }
    }

    function logout() {
        loggedIn = 0;
        alert('Logged out successfully!');
        loadLanguage(); // Update the login link
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

function updateAuthLink() {
    const authLink = document.getElementById('auth-link');
    if (loggedIn != 0) {
        authLink.innerHTML = '<a id="logout-link" href="index.html">Disconnect</a>';
    } else {
        authLink.innerHTML = '<a id="login-link" href="./login/login.html">Sign-in/Log in</a>';
    }
}

// Example function to set the loggedIn variable and update the auth link
function checkLoginStatus() {
    // Assume loggedIn is a global variable
    // Set loggedIn based on your login logic
    loggedIn = localStorage.getItem('loggedIn') || 0; // Example: get login status from localStorage

    // Update the auth link based on login status
    updateAuthLink();
}

// Ensure the auth link is updated when the page is ready
window.addEventListener('DOMContentLoaded', (event) => {
    checkLoginStatus();
});

function showAddUserForm() {
    document.getElementById('addUserForm').style.display = 'block';
    document.getElementById('removeUserForm').style.display = 'none';
    document.getElementById('addMovieForm').style.display = 'none';
    document.getElementById('removeMovieForm').style.display = 'none';
    document.getElementById('addReviewForm').style.display = 'none';
    document.getElementById('removeReviewForm').style.display = 'none';
}

function showRemoveUserForm() {
    document.getElementById('addUserForm').style.display = 'none';
    document.getElementById('removeUserForm').style.display = 'block';
    document.getElementById('addMovieForm').style.display = 'none';
    document.getElementById('removeMovieForm').style.display = 'none';
    document.getElementById('addReviewForm').style.display = 'none';
    document.getElementById('removeReviewForm').style.display = 'none';
}

function showAddMovieForm() {
    document.getElementById('addUserForm').style.display = 'none';
    document.getElementById('removeUserForm').style.display = 'none';
    document.getElementById('addMovieForm').style.display = 'block';
    document.getElementById('removeMovieForm').style.display = 'none';
    document.getElementById('addReviewForm').style.display = 'none';
    document.getElementById('removeReviewForm').style.display = 'none';
}

function showRemoveMovieForm() {
    document.getElementById('addUserForm').style.display = 'none';
    document.getElementById('removeUserForm').style.display = 'none';
    document.getElementById('addMovieForm').style.display = 'none';
    document.getElementById('removeMovieForm').style.display = 'block';
    document.getElementById('addReviewForm').style.display = 'none';
    document.getElementById('removeReviewForm').style.display = 'none';
}

function showAddReviewForm() {
    document.getElementById('addUserForm').style.display = 'none';
    document.getElementById('removeUserForm').style.display = 'none';
    document.getElementById('addMovieForm').style.display = 'none';
    document.getElementById('removeMovieForm').style.display = 'none';
    document.getElementById('addReviewForm').style.display = 'block';
    document.getElementById('removeReviewForm').style.display = 'none';
}

function showRemoveReviewForm() {
    document.getElementById('addUserForm').style.display = 'none';
    document.getElementById('removeUserForm').style.display = 'none';
    document.getElementById('addMovieForm').style.display = 'none';
    document.getElementById('removeMovieForm').style.display = 'none';
    document.getElementById('addReviewForm').style.display = 'none';
    document.getElementById('removeReviewForm').style.display = 'block';
}

function addUser() {
    const username = document.getElementById('addUsername').value;
    const password = document.getElementById('addUserPassword').value;
    const mail = document.getElementById('addUserEmail').value;
    const role = document.getElementById('addUserRole').value;
    return signup(username, password, mail, role);
}

function signup(username, password, mail, role) {

    if (username && password) {
        const user = { username, password, mail, role };
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

function removeUser(username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => user.username !== username);

    if (users.length === updatedUsers.length) {
        alert('User not found.');
        return false;
    }

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('User removed:', username); // Debugging log
    alert('User removed successfully!');
    return true;
}

function handleRemoveUser(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const username = document.getElementById('removeUsername').value;
    return removeUser(username);
}

function addMovie() {
    const id = document.getElementById('addMovieId').value;
    const title = document.getElementById('addMovieTitle').value;
    const titlefr = document.getElementById('addMovieTitlefr').value;
    const date = document.getElementById('addMovieReleasedate').value;
    const overview = document.getElementById('addMovieOverview').value;
    const overviewfr = document.getElementById('addMovieOverviewfr').value;
    const vote = document.getElementById('addMovieVote').value;
    const poster = document.getElementById('addMoviePoster').value;

    // console.log('Date:', date); // Debugging log to check the date value

    const movieEn = { id, title, date, overview, vote, poster };
    const movieFr = { id, title: titlefr, date, overview: overviewfr, vote, poster };

    let moviesEn = JSON.parse(localStorage.getItem('cleaned_movies.json')) || [];
    let moviesFr = JSON.parse(localStorage.getItem('cleaned_movies_fr.json')) || [];

    moviesEn.push(movieEn);
    moviesFr.push(movieFr);

    localStorage.setItem('cleaned_movies.json', JSON.stringify(moviesEn));
    localStorage.setItem('cleaned_movies_fr.json', JSON.stringify(moviesFr));

    console.log('Movie added (EN):', movieEn); // Debugging log
    console.log('Movie added (FR):', movieFr); // Debugging log
    alert('Movie added successfully!');
    return false; // Prevent form submission
}


loadMoviesToLocalStorage().then(() => {
    loadMovies();
    loadLatestMovies();
});


function removeMovie(id) {
    let moviesEn = JSON.parse(localStorage.getItem('cleaned_movies.json')) || [];
    let moviesFr = JSON.parse(localStorage.getItem('cleaned_movies_fr.json')) || [];

    const updatedMoviesEn = moviesEn.filter(movie => movie.id !== id);
    const updatedMoviesFr = moviesFr.filter(movie => movie.id !== id);

    if (moviesEn.length === updatedMoviesEn.length) {
        alert('Movie not found.');
        return false;
    }

    localStorage.setItem('cleaned_movies.json', JSON.stringify(updatedMoviesEn));
    localStorage.setItem('cleaned_movies_fr.json', JSON.stringify(updatedMoviesFr));

    console.log('Movie removed:', id); // Debugging log
    alert('Movie removed successfully!');
    return true;
}

function handleRemoveMovie(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const id = document.getElementById('removeMovieId').value;
    return removeMovie(id);
}