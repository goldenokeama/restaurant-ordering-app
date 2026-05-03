import { menuArray } from "./data.js";

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
        <buttton class="btn add-btn"><p>+</p></buttton>
      </li>
    `;
  });

  return menuListItems;
}

function render() {
  document.getElementById("menu-feed").innerHTML = getMenuFeed();
}
render();
