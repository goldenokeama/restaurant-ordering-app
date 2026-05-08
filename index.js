import { menuArray } from "./data.js";

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddButtonClick(e.target.dataset.add);
  }
});

let foodsOrdered = [];

function handleAddButtonClick(menuId) {
  const targetMenuObj = menuArray.filter(function (menu) {
    return menu.id === Number(menuId);
  })[0];

  foodsOrdered.push(targetMenuObj);
  renderFoodsOrdered();
}

function renderFoodsOrdered() {
  document.getElementById("orders").innerHTML = getOrderedFoodsHtml();

  document.getElementById("checkout-section").style.display = "block";
}

function getOrderedFoodsHtml() {
  return foodsOrdered
    .map((food) => {
      return `
      <li class="order">
        <span class="order-name">${food.name}</span>
        <button class="btn btn-remove">remove</button>
        <span class="order-price">$${food.price}</span>
      </li>
    `;
    })
    .join("");
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

// Add focus states to the hover states in the CSS file.
