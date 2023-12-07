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

function renderorders() {
  var ordersContainer = document.getElementById("orders-container");

  var orders = JSON.parse(localStorage.getItem("orders"))
    ? JSON.parse(localStorage.getItem("orders"))
    : [];

  ordersContainer.innerHTML = "";

  var renderOrders = orders.map((order) => {
    console.log(order);
  });

  ordersContainer.innerHTML = renderOrders.join("");
}

function renderProducts(products) {
  var productsList = products.map((product) => {
    return `
      <div class="product">
        <img src="${product.image}" alt="${product.title}" />
        <span class="title">${product.title}</span>
        <span class="description">${product.description}</span>
        <span class="quantity">Quantity: 2</span>
        <span class="price">Price: ${product.price}</span>
      </div>
    `;
  });

  return (productsList = productsList.join(""));
}

/**` */
/******************************************************** Sign Out FUNCTION **************************************** */

function signout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../../pages/login.html";
}
