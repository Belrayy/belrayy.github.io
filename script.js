function setLanguage(language) {
    // Save the selected language to localStorage
    localStorage.setItem('language', language);
    loadLanguage(); // Load content in the selected language
}

// Function to load the language when the page loads
function loadLanguage() {
    const language = localStorage.getItem('language') || 'en'; // Default to English if not set
    document.documentElement.lang = language;

    if (language === 'fr') {
        document.getElementById('heading').textContent = "Bienvenue!";
        document.getElementById('content').textContent = "Voici du contenu en français. Changez en anglais avec le bouton ci-dessus.";
    } else {
        document.getElementById('heading').textContent = "Welcome!";
        document.getElementById('content').textContent = "This is some content in English. Switch to French with the button above.";
    }
}

// Call loadLanguage on page load to set the language correctly
window.onload = loadLanguage;