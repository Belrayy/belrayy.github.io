const signInBtn = document.getElementById("signInBtn");
const signInPopup = document.getElementById("signInPopup");
const closePopupBtn = document.getElementById("closePopupBtn");
const signInForm = document.getElementById("signInForm");

// Function to show the popup
function showPopup() {
  signInPopup.style.display = "flex";
}

// Function to close the popup
function closePopup() {
  signInPopup.style.display = "none";
}

// Function to handle account creation
function createAccount(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Store account information in localStorage
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  alert("Account created successfully!");
  closePopup();

  // Update the sign-in button text
  signInBtn.textContent = "Disconnect";
}

// Event listeners
signInBtn.addEventListener("click", () => {
  if (localStorage.getItem("username")) {
    // If the user is logged in, disconnect
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    signInBtn.textContent = "Sign In";
  } else {
    // Otherwise, show the sign-in popup
    showPopup();
  }
});

closePopupBtn.addEventListener("click", closePopup);
signInForm.addEventListener("submit", createAccount);

// Automatically change the button text if user is already logged in
if (localStorage.getItem("username")) {
  signInBtn.textContent = "Disconnect";
}
