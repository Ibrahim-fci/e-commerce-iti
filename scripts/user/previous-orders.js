// check if user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"))
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

if (!currentUser || currentUser == null) {
  location.href = "../../pages/login.html";
}

// get all

var orders = JSON.parse(localStorage.getItem("orders"))
  ? JSON.parse(localStorage.getItem("orders"))
  : [];

document.addEventListener("DOMContentLoaded", function () {
  renderorders();
});

// function to render orders
function renderorders() {
  var counter = 0;
  var totalPrice = 0;
  var ordersContainer = document.getElementById("orders-container");
  var usersOrders = orders.filter((order) => order.email == currentUser.email);

  ordersContainer.innerHTML = "";
  usersOrders.map((order) => {
    counter++;
    var quantity = 0;
    ordersContainer.innerHTML += `
    <section class="order-section">
    <h2>Order #${counter}</h2>
    <div class="order-details">
      <div class="product-list">
      ${order.products.map((product) => {
        quantity = product.quantity;
        product = getProduct(product.id);
        totalPrice += product.price * quantity;
        return `
          <div class="product">
            <img src="${product.image}" alt="${product.title}" />
            <span class="title">${product.title}</span>
            <span class="description">${product.description}</span>
            <span class="quantity">Quantity: ${quantity}</span>
            <span class="price">Price: ${product.price}</span>
          </div>
          `;
      })}
       
      </div>
      <div class="user-details">
        <span class="username">Username: ${order.name}</span>
        <span class="useremail">Email: ${order.email}</span>
      </div>
      <div class="total-price">Total Price: ${totalPrice}</div>
      ${
        order.status == "pending"
          ? `<div style="background-color: #007BFF" class="status accept-button" disabled>Status: Pending...</div>`
          : `<div style="background-color: green" class="status accept-button" disabled>Status: Accepted</div>`
      } 


    </div>
  </section>
`;
  });
}

/******************************************************** Sign Out FUNCTION **************************************** */

function signout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../../pages/login.html";
}

///  fun to get product by id
function getProduct(id) {
  var products = JSON.parse(localStorage.getItem("products"))
    ? JSON.parse(localStorage.getItem("products"))
    : [];

  return products.find((product) => product.id == id);
}

//
function showCart() {
  location.href = "../../pages/user/cart.html";
}

function showWishList() {
  location.href = "../../pages/user/Wishlisht.html";
}
