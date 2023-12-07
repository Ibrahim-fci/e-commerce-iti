let productdom = document.querySelector(".products");
function drawcartUi(allproducts = []) {
  let products =
    JSON.parse(localStorage.getItem("productsincart")) || allproducts;

  let productUI = products.map((item) => {
    return `
    <div class="product-item">
    <span style="display:none;">${item.id}</span>
    <span style="display:none;">${item.title}</span>
      <img src="${item.image}" alt="prodct" class="product-item-image>
      <div class="product-info">
        <h2>${item.category}</h2>
        <span style="display:none;">${item.description}</span>
        <p class="description">${item.description.slice(0, 150)}</p>
        <h3>${"$" + item.price}</h3>
        <input type="number" name="quantity_product2" value="${
          item.quantity
        }" min="1" style="width: 50%;margin:4em auto"
        oninput="updateCartProductQuantity(${item.id}, this.value)">
        <span style="display:none;">${item.rating.count}</span>
        <button id="btn-action" onclick="Removeitemfromcart(${
          item.id
        })">Remove from cart</button>
        <button class="btn-icon" onclick="addtoWishlisht(${
          item.id
        })"><ion-icon name="heart-outline" class="fav-icon"></ion-icon></button>
 
        </div>
        </div>
    `;
  });
  productdom.innerHTML = productUI.join("");
}
drawcartUi();

function Removeitemfromcart(id) {
  let productIncart = localStorage.getItem("productsincart");
  if (productIncart) {
    let items = JSON.parse(productIncart);
    let filtereditems = items.filter((item) => item.id !== id);
    localStorage.setItem("productsincart", JSON.stringify(filtereditems));
    drawcartUi(filtereditems);
  }
}
let Wishlisht = document.querySelector("#Wishlisht");
let Wishlishtnum = document.querySelector("#Wishlishtbadge");
let addedWishlisht = localStorage.getItem("Wishlishtlist")
  ? JSON.parse(localStorage.getItem("Wishlishtlist"))
  : [];
Wishlishtnum.innerHTML += addedWishlisht.length;
Wishlisht.addEventListener("click", function () {
  window.location = "Wishlisht.html";
});

// function to update cart product quantity
function updateCartProductQuantity(id, quantity) {
  let productInCart = localStorage.getItem("productsincart");
  if (productInCart) {
    let items = JSON.parse(productInCart);
    let updatedItems = items.map((item) => {
      if (item.id === id) {
        item.quantity = quantity;
      }
      return item;
    });
    localStorage.setItem("productsincart", JSON.stringify(updatedItems));
  }
}

//
function redirectToPage() {
  window.location = "./checkout.html";
}
