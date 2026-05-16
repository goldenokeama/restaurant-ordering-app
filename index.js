import { menuArray } from "./data.js";

const checkoutSection = document.getElementById("checkout-section");
const modalCardSection = document.getElementById("modal-card-section");
// const btnPay = document.getElementById("btn-pay");
const form = document.getElementById("form");
const thankYouMessage = document.getElementById("thank-you-message");

let foodsOrdered = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddButtonClick(e.target.dataset.add);
  }

  if (e.target.dataset.remove) {
    handleRemoveButtonClick(e.target.dataset.remove);
  }

  if (e.target.id === "complete-order") {
    handleCompleteOrderButtonClick();
  }

  if (!modalCardSection.contains(e.target)) {
    // closeModalCardSection()
    console.log("close the modal");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // close the modal card section
  modalCardSection.style.display = "none";

  // close the checkout section
  checkoutSection.style.display = "none";

  // display the thank you message
  thankYouMessage.style.display = "block";

  // clear out the previously ordered meals
  foodsOrdered = [];

  // reset the input elements values in the form element.
  form.reset();
});

function handleAddButtonClick(menuId) {
  const targetMenuObj = menuArray.filter(function (menu) {
    return menu.id === Number(menuId);
  })[0];

  foodsOrdered.push(targetMenuObj);
  renderFoodsOrdered();
}

function handleRemoveButtonClick(orderedFoodId) {
  foodsOrdered = foodsOrdered.filter(function (food) {
    // the + sign converts the orderedFoodId to number data type
    return food.id !== +orderedFoodId;
  });

  renderFoodsOrdered();
}

function handleCompleteOrderButtonClick() {
  modalCardSection.style.display = "block";
}

function calcTotalPriceOfFoodsOrdered() {
  let totalPrice = 0;

  foodsOrdered.forEach((food) => (totalPrice += food.price));

  return totalPrice;
}

function renderFoodsOrdered() {
  document.getElementById("orders").innerHTML = getOrderedFoodsHtml();

  checkoutSection.style.display = "block";

  // hide the thank you message if it's showing
  thankYouMessage.style.display = "none";

  document.getElementById("total-price").textContent =
    "$" + calcTotalPriceOfFoodsOrdered();

  // hides the checkout section when there are no ordered foods
  if (foodsOrdered.length <= 0) {
    checkoutSection.style.display = "none";
  }
}

function getOrderedFoodsHtml() {
  const listHtml = foodsOrdered
    .map((food) => {
      return `
      <li class="order">
        <span class="order-name">${food.name}</span>
        <button class="btn btn-remove" data-remove="${food.id}">remove</button>
        <span class="order-price">$${food.price}</span>
      </li>
    `;
    })
    .join("");

  return listHtml;
}

function getMenuFeed() {
  let menuListItems = "";

  menuArray.forEach(function (menu) {
    menuListItems += `
      <li class="item-list">
        <div class="item-graphic">
          <span>${menu.emoji} </span>
        </div>

        <div class="item-details">
          <h2 class="name">${menu.name}</h2>
          <p class="ingredients">${menu.ingredients.join(", ")}</p>
          <p class="price">$${menu.price}</p>
        </div>

        <buttton class="btn add-btn" data-add="${menu.id}">+</buttton>
      </li>
    `;
  });

  return menuListItems;
}

function render() {
  document.getElementById("menu-feed").innerHTML = getMenuFeed();
}
render();
