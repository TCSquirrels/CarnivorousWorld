document.addEventListener("DOMContentLoaded", function() {
  // --- Function to display logged-in user info ---
  function displayMyInfo() {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    let currentUser = localStorage.getItem("currentUser");

    const myShareSection = document.getElementById("my-share-info");
    const myUsername = document.getElementById("my-username");
    const myShares = document.getElementById("my-shares");
    const myValue = document.getElementById("my-value");
    const myDividends = document.getElementById("my-dividends");
    const myTcspoints = document.getElementById("my-tcspoints");

    if (currentUser && users[currentUser]) {
      const me = users[currentUser];
      myShareSection.style.display = "block";
      myUsername.textContent = currentUser;
      myShares.textContent = me.shares;
      myValue.textContent = me.value;
      myDividends.textContent = me.dividends;
      myTcspoints.textContent = me.tcspoints;
    } else {
      myShareSection.style.display = "none";
    }
  }

  // --- Clear info on logout ---
  function clearMyInfo() {
    const myShareSection = document.getElementById("my-share-info");
    if (myShareSection) {
      myShareSection.style.display = "none";
    }
  }

  // --- Run once on page load ---
  displayMyInfo();

  // --- Listen for login/logout events ---
  document.addEventListener("userLoggedIn", displayMyInfo);
  document.addEventListener("userLoggedOut", clearMyInfo);

  // --- Search other users ---
  const usernameSearch = document.getElementById("username-search");
  const shareInfo = document.getElementById("share-info");

  usernameSearch.addEventListener("input", function() {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const username = this.value.trim().toLowerCase();

    if (users[username]) {
      const user = users[username];
      shareInfo.innerHTML = `
        <p><strong>Number of shares:</strong> ${user.shares}</p>
        <p><strong>Value of shares:</strong> $${user.value}</p>
        <p><strong>Dividends earned:</strong> $${user.dividends}</p>
      `;
    } else {
      shareInfo.innerHTML = '';
    }
  });
});


