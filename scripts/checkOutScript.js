"use strict";

const hamburgerMenu = document.querySelector(".hamburgerMenu");
const sideNavMenu = document.querySelector(".sideNavMenu");
const cartItemsContainer = document.querySelector(".cartItems");
const orderNumber = document.querySelector(".orderNumber");
const newOrderButton = document.querySelector(".newOrderButton");

// Side bar open & close for small Screens
hamburgerMenu.addEventListener("click", () => {
  sideNavMenu.classList.toggle("visible");
  hamburgerMenu.classList.toggle("cross");
});

// Generating random order number between 1-100
orderNumber.textContent = `#${(Math.floor(Math.random() * 100) + 1)
  .toString()
  .padStart(3, "0")}`;

newOrderButton.addEventListener(
  "click",
  () => (window.location.href = "../index.html")
);
