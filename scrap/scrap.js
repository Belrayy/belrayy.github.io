const axios = require('axios');
const fs = require('fs');
require('dotenv').config();  // Load environment variables from .env file

const apiKey = process.env.OMDB_API_KEY;  // Get API key from environment variables
const baseUrl = 'http://www.omdbapi.com/';

// Array to store movie data
let moviesData = [];

// The IMDb Top 250 IDs you can scrape or load from your source
const movieIds = [
    'tt0111161', // The Shawshank Redemption
    'tt0068646', // The Godfather
    'tt0071562', // The Godfather: Part II
    'tt0468569', // The Dark Knight
    'tt3896198', // Guardians of the Galaxy Vol. 2
    'tt0108052', // Schindler's List
    'tt0137523', // Fight Club
    'tt0080684', // Star Wars: Episode V - The Empire Strikes Back
    'tt0109830', // Forrest Gump
    'tt0167260', // The Lord of the Rings: The Return of the King
    'tt0133093', // The Matrix
    'tt1375666', // Inception
    'tt0118799', // Saving Private Ryan
    'tt0038650', // Citizen Kane
    'tt0120338', // The Lord of the Rings: The Fellowship of the Ring
    'tt0102926', // The Lion King
    'tt0099685', // Goodfellas
    'tt0034583', // It's a Wonderful Life
    'tt0114369', // The Usual Suspects
    'tt0073486', // One Flew Over the Cuckoo's Nest
    'tt0095016', // Se7en
    'tt0106071', // The Silence of the Lambs
    'tt0120815', // Titanic
    'tt0097576', // Back to the Future
    'tt0027977', // Casablanca
    'tt0082971', // Raging Bull
    'tt0112760', // Braveheart
    'tt0076759', // Star Wars: Episode IV - A New Hope
    'tt0361748', // Spirited Away
    'tt0134064', // American History X
    'tt0198781', // Memento
    'tt0034584', // The Shawshank Redemption (1955)
    'tt0078748', // Alien
    'tt0047478', // Sunset Boulevard
    'tt0053125', // Rear Window
    'tt0101410', // The Godfather: Part III
    'tt0086190', // The Shining
    'tt0407887', // The Dark Knight Rises
    'tt0070735', // A Clockwork Orange
    'tt0081505', // Apocalypse Now
    'tt0024216', // The Godfather (1931)
    'tt0097814', // The Breakfast Club
    'tt0088247', // The Great Escape
    'tt0072684', // The Deer Hunter
    'tt0042192', // The Third Man
    'tt0118798', // Schindler's List (1993)
    'tt0041959', // North by Northwest
    'tt0090338', // Dances with Wolves
    'tt0068647', // The Godfather (Part 2)
    'tt0100162', // Aladdin
    'tt0073195', // The Good, the Bad and the Ugly
    'tt0100332', // The Terminator
    'tt0025836', // The Maltese Falcon
    'tt0082092', // The Wizard of Oz
    'tt0060196', // A Streetcar Named Desire
    'tt0113011', // The Silence of the Lambs (1991)
    'tt0053672', // Rear Window (1954)
    'tt0031398', // The Big Lebowski
    'tt0089028', // The Bridge on the River Kwai
    'tt0046876', // The Seven Samurai
    'tt0032420', // The Apartment
    'tt0046816', // Roman Holiday
    'tt0086577', // Cool Hand Luke
    'tt0107231', // The Terminator 2
    'tt0100195', // A Clockwork Orange (1971)
    'tt0073378', // Dirty Harry
    'tt0032546', // Double Indemnity
    'tt0089217', // The French Connection
    'tt0056172', // Midnight Cowboy
    'tt0022537', // The Killing
    'tt0101150', // The Princess Bride
    'tt0081398', // The Bridge on the River Kwai (1966)
    'tt0055610', // The Manchurian Candidate
    'tt0080150', // Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb
    'tt0039780', // Some Like It Hot
    'tt0033130', // The Great Dictator
    'tt0104332', // Goodfellas (1990)
    'tt0023086', // Gone with the Wind
    'tt0029843', // The Graduate
    'tt0062602', // The Good, the Bad, and the Ugly (1966)
    'tt0105031', // Titanic (1997)
    'tt0103219', // Terms of Endearment
    'tt0099416', // The Matrix Reloaded
    'tt0097291', // The Pianist
    'tt0035126', // The Big Sleep
    'tt0038645', // The Maltese Falcon (1941)
    'tt0101272', // Casablanca (1942)
    'tt0033045', // City Lights
    'tt0031320', // Gone with the Wind (1939)
    'tt0088190', // Blade Runner
    'tt0063423', // Paths of Glory
    'tt0097418', // The Killing Fields
    'tt0038543', // The Adventures of Robin Hood
    'tt0064548', // Barry Lyndon
    'tt0050407', // Twelve Angry Men
    'tt0032344', // Nosferatu (1922)
    'tt0097612', // The Thing
    'tt0066992', // Network
    'tt0075314', // An American in Paris
    'tt0042216', // The Cuckoo's Nest
    'tt0081562', // My Fair Lady
    'tt0066721', // The Sound of Music
    'tt0106922', // Fargo
    'tt0079095', // The Killing (1955)
    'tt0061479', // The Man Who Shot Liberty Valance
    'tt0099327', // The Graduate (1967)
    'tt0021197', // The Searchers
    'tt0084787', // It's a Mad, Mad, Mad, Mad World
    'tt0088944', // The Night of the Hunter
    'tt0079811', // 12 Angry Men
    'tt0060195', // Singin' in the Rain
    'tt0067810', // Casablanca (1967)
    'tt0040320', // The Wizard of Oz (1939)
    'tt0056186', // Rocky
    'tt0062081', // Gone with the Wind (1941)
    'tt0068041', // The Philadelphia Story
    'tt0089370', // All Quiet on the Western Front
    'tt0077313', // The Seven Year Itch
    'tt0091149', // Metropolis
    'tt0093785', // The Big Chill
    'tt0034294', // Star Wars: Episode VI - Return of the Jedi
    'tt0082904', // 2001: A Space Odyssey
    'tt0076829', // The Big Heat
    'tt0037254', // The Old Man and the Sea
    'tt0097151', // The Lost Weekend
    'tt0070730', // The Grapes of Wrath
    'tt0043954', // The Apartment (1961)
    'tt0022784', // The Conversation
    'tt0035442', // The Lady Eve
    'tt0023106', // The Elephant Man
    'tt0081667', // A Few Good Men
    'tt0061022', // The Fugitive
    'tt0075971', // The Wild Bunch
    'tt0036230', // The Outlaw Josey Wales
    'tt0067815', // The Bridge on the River Kwai (1957)
    'tt0081886', // The Incredibles
    'tt0061790', // The Searchers (1966)
    'tt0086353', // Easy Rider
    'tt0024435', // The Killing Fields
    'tt0044741', // The Great Escape (1965)
    'tt0059511', // Touch of Evil
    'tt0090525', // True Grit
    'tt0074627', // L.A. Confidential
    'tt0025950', // The Godfather (2002)
    'tt0032540', // The Apartment (1954)
    'tt0099627', // The Incredibles 2
    'tt0033127', // The Great Gatsby
    'tt0060197', // The Untouchables
    'tt0033522', // Dial M for Murder
    'tt0075747', // Network (1976)
    'tt0060107', // The Bridge on the River Kwai (2000)
    'tt0096348', // Little Miss Sunshine
    'tt0088310', // The Graduate (1967)
    'tt0082492', // The Gangs of New York
    'tt0056592', // The Matrix Revolutions
    'tt0083129', // The Maltese Falcon (1945)
    'tt0041949', // The Wizard of Oz (1998)
    'tt0094985', // The Lion King 2
];


// Function to fetch movie data
async function fetchMovieData(movieId) {
    const url = `${baseUrl}?i=${movieId}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);

        // Check if the API response is successful
        if (response.data.Response === "True") {
            const movie = {
                id: response.data.imdbID,
                title: response.data.Title,
                release_date: response.data.Released,
                overview: response.data.Plot,
                poster_path: response.data.Poster,
                vote_average: response.data.imdbRating
            };
            moviesData.push(movie);
        } else {
            console.log(`No data for movie ID: ${movieId}. Error: ${response.data.Error}`);
        }

    } catch (error) {
        console.error(`Error fetching data for movie ID ${movieId}:`, error.message);
    }
}

// Function to add a delay between requests
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to scrape movies (Top 250)
async function scrapeMovies() {
    for (let i = 0; i < movieIds.length; i++) {
        console.log(`Fetching movie ${i + 1} of ${movieIds.length}...`);
        await fetchMovieData(movieIds[i]);

        // Wait 1 second between requests to avoid hitting rate limits
        if (i < movieIds.length - 1) {
            await delay(1000); // 1-second delay between requests
        }
    }

    // Write data to a JSON file
    if (moviesData.length > 0) {
        fs.writeFileSync('movies.json', JSON.stringify(moviesData, null, 2));
        console.log('Data has been saved to movies.json');
    } else {
        console.log('No data to save.');
    }
}

// Start the scraping process
scrapeMovies();
