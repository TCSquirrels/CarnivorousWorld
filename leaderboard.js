// leaderboard.js
document.addEventListener("DOMContentLoaded", function() {
  function renderLeaderboard() {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const leaderboardDiv = document.getElementById("leaderboard-list");
    // Transforme en tableau et trie par shares décroissant
    const sorted = Object.entries(users)
      .sort((a, b) => (b[1].shares || 0) - (a[1].shares || 0));
    leaderboardDiv.innerHTML = `
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <th style="text-align:left;">Username</th>
          <th style="text-align:right;">Shares</th>
        </tr>
        ${sorted.map(([username, data]) => `
          <tr>
            <td>${username}</td>
            <td style="text-align:right;">${data.shares || 0}</td>
          </tr>
        `).join('')}
      </table>
    `;
  }
  // Affiche le leaderboard à chaque fois que l'onglet est affiché
  document.getElementById("tab4").addEventListener("change", renderLeaderboard);
  // Optionally, render on page load if tab4 is checked
  if (document.getElementById("tab4").checked) {
    renderLeaderboard();
  }
});