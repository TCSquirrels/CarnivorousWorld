// script.js

document.addEventListener("userLoggedIn", () => {
  const user = localStorage.getItem("currentUser");
  if (user) {
    document.getElementById("share-username").textContent = user;
  }
});

document.addEventListener("userLoggedOut", () => {
  document.getElementById("share-username").textContent = "Guest";
});

// On page load, sync state
const existingUser = localStorage.getItem("currentUser");
if (existingUser) {
  document.getElementById("share-username").textContent = existingUser;
} else {
  document.getElementById("share-username").textContent = "Guest";
}

