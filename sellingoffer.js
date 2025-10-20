//sellingoffer.js

1

let offers = JSON.parse(localStorage.getItem("offers")) || [];

const tradeForm = document.getElementById('trade-form');
const auctionBoard = document.getElementById('auction-board');
const currentSellerSpan = document.getElementById('current-seller');

function updateSellerName() {
  currentSellerSpan.textContent = localStorage.getItem("currentUser") || "Not logged in";
}
//render offer
function renderOffers() {
  auctionBoard.innerHTML = offers.map((offer, index) => `
    <div>
      <strong>${offer.seller}</strong> selling <strong>${offer.shares}</strong> shares at $${offer.price} each
      <button onclick="buyOffer(${index})">Buy</button>
    </div>
  `).join('');
}

// Post new offer
tradeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const seller = localStorage.getItem("currentUser");
  const shares = parseInt(document.getElementById('shares-amount').value);
  const price = parseFloat(document.getElementById('price-per-share').value);

  if (!seller || !users[seller]) {
    alert("You must be logged in to sell shares!");
    return;
  }

  if (users[seller].shares < shares) {
    alert("Seller does not have enough shares!");
    return;
  }

  offers.push({ seller, shares, price });
  localStorage.setItem("offers", JSON.stringify(offers));
  renderOffers();
  tradeForm.reset();
});
// Render offers when Auction House tab is selected
document.getElementById("tab5").addEventListener("change", () => {
  updateSellerName();
  renderOffers();
});

// Also update seller name on login
document.addEventListener("userLoggedIn", updateSellerName);

// Initial render
updateSellerName();
renderOffers();


  
    