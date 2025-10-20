//buyingoffer.js


function buyOffer(index) {
  let offers = JSON.parse(localStorage.getItem("offers")) || [];
  let users = JSON.parse(localStorage.getItem("users")) || {};
  const offer = offers[index];
  const buyer = localStorage.getItem("currentUser");

  if (!buyer || !users[buyer]) {
    alert("You must be logged in to buy shares!");
    return;
  }

  // Transfer shares
  if (buyer === offer.seller) {
    alert("Seller cannot buy their own shares!");
    return;
  }
  if (users[offer.seller].shares < offer.shares){
    alert("Seller does not have enough shares!");
  return;
  }
   // Check if buyer has enough points/money
  const totalCost = offer.shares * offer.price;
  if ((users[buyer].points || 0) < totalCost) {
    alert("You do not have enough points to buy these shares!");
    return;
  }

  

  //transfer shares
  users[offer.seller].shares -= offer.shares;
  users[buyer].shares += offer.shares;

  // Remove offer
  offers.splice(index, 1);
  localStorage.setItem("offers", JSON.stringify(offers));
  localStorage.setItem("users", JSON.stringify(users));
  document.dispatchEvent(new Event("userLoggedIn")); //Update share info // Re-render offers
  //re-render offer
  const auctionBoard = document.getElementById('auction-board');
  auctionBoard.innerHTML = offers.map((offer, idx) => `
    <div>
      <strong>${offer.seller}</strong> selling <strong>${offer.shares}</strong> shares at ${offer.price} each
      <button onclick="buyOffer(${idx})">Buy</button>
    </div>
  `).join('');
  alert(`Trade completed: ${buyer} bought ${offer.shares} shares from ${offer.seller}`);
}