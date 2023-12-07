// check if user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"))
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

if (!currentUser || currentUser == null) {
  location.href = "../../pages/login.html";
}

// get orders collections
var orders = JSON.parse(localStorage.getItem("orders"))
  ? JSON.parse(localStorage.getItem("orders"))
  : [];

// get orders collections
var cart = JSON.parse(localStorage.getItem("productsincart"))
  ? JSON.parse(localStorage.getItem("productsincart"))
  : [];

// render order products in the cart section in the checkout page when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  renderorderProducts();
});

//func to render order products
function renderorderProducts() {
  var totalPriceElem = document.getElementById("total-price");
  var totalPrice = 0;
  var ordersContainer = document.getElementById("orderDetails");

  var userCart = cart.filter((item) => item.userEmail == currentUser.email);

  ordersContainer.innerHTML = "";

  var rendeCartrProducts = userCart.map((product) => {
    totalPrice += product.price * product.quantity;
    return `
            <tr>
              <td>${product.title}</td>
              <td>$${product.quantity}</td>
              <td>$${product.price * product.quantity}</td>
            </tr>`;
  });

  ordersContainer.innerHTML = rendeCartrProducts.join("");
  totalPriceElem.innerHTML = "$" + totalPrice;
}

//  set the current user default user
var userName = document.getElementById("name");
var address = document.getElementById("address");
var email = document.getElementById("email");
var payment = document.getElementById("payment");

// set the default user data
userName.value = currentUser.username;
email.value = currentUser.email;

// func to create order
function createOrder() {
  // check if user cart is empty
  if (getAllProductsIdesFromCart().length == 0) {
    alert("Please add products to your cart");
    return;
  }

  orders.push({
    id: orders.length + 1,
    name: userName.value,
    address: address.value,
    email: email.value,
    payment: payment.value,
    products: getAllProductsIdesFromCart(),
    status: "pending",
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  // free user cart
  cart = cart.filter((item) => item.userEmail != currentUser.email);
  localStorage.setItem("productsincart", JSON.stringify(cart));

  // redirect to all order page
  location.href = "../../pages/user/previous-orders.html";
}

var placeOrderBtn = document.getElementById("placeOrderBtn");
placeOrderBtn.addEventListener("click", createOrder);

// function to get all products in the cart
function getAllProductsIdesFromCart() {
  cart = JSON.parse(localStorage.getItem("productsincart"))
    ? JSON.parse(localStorage.getItem("productsincart"))
    : [];

  var productsIdes = cart.map((product) => {
    if (product.userEmail == currentUser.email) {
      return { id: product.id, quantity: product.quantity };
    }
  });

  return productsIdes;
}

/******************************************************** Sign Out FUNCTION **************************************** */

function signout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../../pages/login.html";
}
