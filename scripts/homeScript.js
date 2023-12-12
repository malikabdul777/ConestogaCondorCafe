"use strict";

const hamburgerMenu = document.querySelector(".hamburgerMenu");
const sideNavMenu = document.querySelector(".sideNavMenu");
const cartItemsContainer = document.querySelector(".cartItems");
//Menu Items add to cart icon
const cappuccinoCardAddIcon = document.querySelector(".cappuccinoAddIcon");
const biscottiCardAddIcon = document.querySelector(".biscottiAddIcon");
const dripCoffeeCardAddIcon = document.querySelector(".dripCoffeeAddIcon");
const sconeCardAddIcon = document.querySelector(".sconeAddIcon");
const latteCardAddIcon = document.querySelector(".latteAddIcon");
const espressoCardAddIcon = document.querySelector(".espressoAddIcon");

const clearCartBtn = document.querySelector(".clearCartBtn");
const cartTotalElement = document.querySelector(".cartTotal");

const goToCartLink = document.querySelector(".goToCartLink");
const cartSection = document.querySelector(".cart");

// Side bar open & close for small Screens
hamburgerMenu.addEventListener("click", () => {
  sideNavMenu.classList.toggle("visible");
  hamburgerMenu.classList.toggle("cross");
});

// Cart Items
let cartItemsArray = [];
let cartTotal = 0.0;

const updateCart = () => {
  cartItemsArray.forEach((item) => {
    cartItemsContainer.innerHTML += `<div class="cartItemCard">
        <div class="cartItemCardLeftContent">
          <img
            src="./images/${item.itemName}.png"
            alt="${item.itemName}"
            class="cartItemImage"
          />
          <div>
            <h2 class="itemTitle">${item.itemName}</h2>
            <p>Cost <span class="itemPrice">$${item.cost.toFixed(2)}</span></p>
          </div>
        </div>
      
        <div class="cartItemCardRightContent">
          <button class="clearBackgroundBtn">
            <span class="material-symbols-outlined ${item.itemName
              .replaceAll(" ", "")
              .toLowerCase()}CartRemove"> remove </span>
          </button>
          <span class="itemQuantity">${item.quantity}</span>
          <button class="clearBackgroundBtn ">
            <span class="material-symbols-outlined ${item.itemName
              .replaceAll(" ", "")
              .toLowerCase()}CartAdd"> add </span>
          </button>
        </div>
      </div>`;
  });
  cartTotalElement.textContent = `$ ${cartTotal.toFixed(2)}`;
};
updateCart();

const clearCart = () => {
  cartItemsContainer.innerHTML = "";
  cartTotalElement.textContent = `$ 0.00`;
};

const addItemToCart = (itemName, cost) => {
  return () => {
    const existingItem = cartItemsArray.find(
      (item) => item.itemName === itemName
    );

    cartTotalElement.textContent = `$ ${(cartTotal += cost).toFixed(2)}`;
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.cost += cost;
    } else {
      cartItemsArray.push({ itemName, cost, quantity: 1 });
    }
    clearCart();
    updateCart();
  };
};

const removeItemToCart = (itemName, cost) => {
  const existingItem = cartItemsArray.find(
    (item) => item.itemName === itemName
  );
  cartTotalElement.textContent = `$ ${(cartTotal -= cost).toFixed(2)}`;

  if (existingItem.quantity > 1) {
    existingItem.quantity -= 1;
    existingItem.cost -= cost;
  } else {
    cartItemsArray = cartItemsArray.filter(
      (item) => item.itemName !== itemName
    );
  }

  clearCart();
  updateCart();
};

// Adding items to cart when user clicks on add buttons in menu item cards
cappuccinoCardAddIcon.addEventListener(
  "click",
  addItemToCart("Cappuccino", 4.5)
);
biscottiCardAddIcon.addEventListener("click", addItemToCart("Biscotti", 3.69));
dripCoffeeCardAddIcon.addEventListener(
  "click",
  addItemToCart("Drip Coffee", 2.5)
);
sconeCardAddIcon.addEventListener("click", addItemToCart("Scone", 6.5));
latteCardAddIcon.addEventListener("click", addItemToCart("Latte", 3.9));
espressoCardAddIcon.addEventListener("click", addItemToCart("Espresso", 3.75));

// Event Handler for add and remove buttons in cart item card
cartItemsContainer.addEventListener("click", (event) => {
  const target = event.target;

  // Add or remove cart items using quantity buttons in cart item cards
  const handleCartItemAction = (className, itemName, cost, action) => {
    if (target.classList.contains(className)) {
      action === addItemToCart
        ? action(itemName, cost)()
        : action(itemName, cost);
    }
  };

  // Check for remove actions
  handleCartItemAction(
    "cappuccinoCartRemove",
    "Cappuccino",
    4.5,
    removeItemToCart
  );
  handleCartItemAction(
    "biscottiCartRemove",
    "Biscotti",
    3.69,
    removeItemToCart
  );
  handleCartItemAction(
    "dripcoffeeCartRemove",
    "Drip Coffee",
    2.5,
    removeItemToCart
  );
  handleCartItemAction("sconeCartRemove", "Scone", 6.5, removeItemToCart);
  handleCartItemAction("latteCartRemove", "Latte", 3.9, removeItemToCart);
  handleCartItemAction(
    "espressoCartRemove",
    "Espresso",
    3.75,
    removeItemToCart
  );

  // Check for add actions
  handleCartItemAction("cappuccinoCartAdd", "Cappuccino", 4.5, addItemToCart);
  handleCartItemAction("biscottiCartAdd", "Biscotti", 3.69, addItemToCart);
  handleCartItemAction("dripcoffeeCartAdd", "Drip Coffee", 2.5, addItemToCart);
  handleCartItemAction("sconeCartAdd", "Scone", 6.5, addItemToCart);
  handleCartItemAction("latteCartAdd", "Latte", 3.9, addItemToCart);
  handleCartItemAction("espressoCartAdd", "Espresso", 3.75, addItemToCart);
});

// Cart Clear Button Click handler
clearCartBtn.addEventListener("click", clearCart);

//Hide cart Floating button when cart is in view
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight / 2;
};

const handleScroll = () => {
  goToCartLink.style.display = isInViewport(cartSection) ? "none" : "block";
};

window.addEventListener("scroll", handleScroll);
handleScroll();

window.addEventListener("resize", handleScroll);
