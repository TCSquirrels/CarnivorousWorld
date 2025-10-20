
document.addEventListener("DOMContentLoaded", function() {
  // Load users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let currentUser = localStorage.getItem("currentUser") || null;

  // DOM elements
  const signinForm = document.getElementById('signin-form');
  const signinMessage = document.getElementById('signin-message');
  const logoutBtn = document.getElementById('logout-btn');
  const logoutSection = document.getElementById('logout-section');
  const signupContent = document.getElementById("signup-content");
  const signinContent = document.getElementById("signin-content");
  const authRadios = document.querySelectorAll('input[name="auth"]');
  const authLabels = document.querySelectorAll('label[for="signin"], label[for="signup"]');
  const dashboard = document.getElementById("welcome-dashboard");
  const usernameSpan = document.getElementById("welcome-username");
  const quoteP = document.getElementById("quote-of-the-week");

  // --- On page load: show/hide dashboard & logout ---
  if (currentUser) {
    signupContent.style.display = "none";
    signinContent.style.display = "none";
    authRadios.forEach(input => input.style.display = "none");
    authLabels.forEach(label => label.style.display = "none");

    usernameSpan.textContent = currentUser;
    const quotes = ["Keep pushing forward!", "Success is the sum of small efforts.", "Stay hungry, stay foolish.", "Dream big, work hard!"];
    quoteP.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    dashboard.style.display = "block";
    logoutSection.style.display = "block";
  } else {
    dashboard.style.display = "none";
    logoutSection.style.display = "none";
  }
   // --- Sign in ---
  signinForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("signin-username").value.trim().toLowerCase();
    const password = document.getElementById("signin-password").value;

    if (!users[username] || users[username].password !== password) {
      signinMessage.textContent = "❌ Invalid username or password";
      signinMessage.style.color = "red";
      return;
    }

    currentUser = username;
    localStorage.setItem("currentUser", currentUser);

    // Hide Sign Up / Sign In forms
    signupContent.style.display = "none";
    signinContent.style.display = "none";
    authRadios.forEach(input => input.style.display = "none");
    authLabels.forEach(label => label.style.display = "none");

    // Show dashboard
    usernameSpan.textContent = currentUser;
    const quotes = ["Keep pushing forward!", "Success is the sum of small efforts.", "Stay hungry, stay foolish.", "Dream big, work hard!"];
    quoteP.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    dashboard.style.display = "block";

    logoutSection.style.display = "block";
    signinForm.reset();

    // Fire event so TCS Share updates
    document.dispatchEvent(new Event("userLoggedIn"));
    console.log("Current user:", currentUser);
  });

  // --- Logout ---
  logoutBtn.addEventListener("click", function() {
    currentUser = null;
    localStorage.removeItem("currentUser");

    

    // Hide dashboard and logout
    dashboard.style.display = "none";
    logoutSection.style.display = "none";

    // Fire event so TCS Share clears
    document.dispatchEvent(new Event("userLoggedOut"));

    alert("👋 See you soon! You’ve been logged out");
  // Refresh page to reset forms & tabs
  location.reload();
  });
});

  