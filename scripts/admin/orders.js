// check if user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"))
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

if (!currentUser || currentUser == null || currentUser.role != "admin") {
  location.href = "../../pages/login.html";
}

/****************************************************************************************************************** */

/** get orders */
var orders = JSON.parse(localStorage.getItem("orders"))
  ? JSON.parse(localStorage.getItem("orders"))
  : [];

document.addEventListener("DOMContentLoaded", () => {
  renderorders();
});

// function to render orders
function renderorders() {
  var counter = 0;
  var totalPrice = 0;
  var ordersContainer = document.getElementById("orders-container");

  ordersContainer.innerHTML = "";
  orders.map((order) => {
    counter++;
    var quantity = 0;
    totalPrice = 0;
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
          ? `<div style="background-color: #007BFF" class="status accept-button" onclick="acceptOrder(${order.id})" >Status: Pending...</div>`
          : `<div style="background-color: green" class="status accept-button" onclick="acceptOrder(${order.id})" >Status: Accepted</div>`
      } 

    </div>
  </section>
`;
  });
}

/**` */
/******************************************************** Sign Out FUNCTION **************************************** */

function signout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../../pages/login.html";
}

// fun to get product by id
function getProduct(id) {
  var products = JSON.parse(localStorage.getItem("products"))
    ? JSON.parse(localStorage.getItem("products"))
    : [];

  return products.find((product) => product.id == id);
}

/********************************************************************* func to accept order */
function acceptOrder(id) {
  var quantity = 0;
  var orders = JSON.parse(localStorage.getItem("orders"))
    ? JSON.parse(localStorage.getItem("orders"))
    : [];

  var products = JSON.parse(localStorage.getItem("products"))
    ? JSON.parse(localStorage.getItem("products"))
    : [];

  var order = orders.find((order) => order.id == id);

  // update order status
  if (order.status == "pending") {
    order.products.map((product) => {
      quantity = product.quantity;
      product = getProduct(product.id);
      if (!product.stockQuantity || product.stockQuantity < quantity) {
        alert("Not enough stock");
        return;
      }
      order.status = "accepted";

      // decrease stock
      product.stockQuantity -= quantity;
      localStorage.setItem("products", JSON.stringify(products));
    });
  } else {
    order.status = "pending";
    order.products.map((product) => {
      quantity = product.quantity;
      product = getProduct(product.id);

      // increase stock
      product.stockQuantity += quantity;
      localStorage.setItem("products", JSON.stringify(products));
    });
  }

  localStorage.setItem("orders", JSON.stringify(orders));

  window.location.reload();
}
