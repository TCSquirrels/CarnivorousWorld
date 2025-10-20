1// signup.js
    const users = JSON.parse(localStorage.getItem("users")) || {};

const signupForm = document.getElementById('signup-form');
const messageDiv = document.getElementById('signup-message');

signupForm.addEventListener('submit', function(e) {
  e.preventDefault();// prevents page reload
  console.log("Submit triggered!");

  const username = document.getElementById('signup-username').value.trim().toLowerCase();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  if (users[username]) {
    messageDiv.textContent = "Username already taken!";
    messageDiv.style.color = "red";
    return;
  }

  users[username] = { email, password, shares: 0, value: 0, dividends: 0, points: 0 };

    localStorage.setItem("users", JSON.stringify(users));

  messageDiv.textContent = "User registered successfully!";
  messageDiv.style.color = "green";
  signupForm.reset();

  console.log("Submit triggered!");

  
});