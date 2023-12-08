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
  orders.push({
    name: userName.value,
    address: address.value,
    email: email.value,
    payment: payment.value,
    products: [1, 2],
    status: "pending",
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  // free user cart
  cart = cart.filter((item) => item.email != currentUser.email);
  localStorage.setItem("productsincart", JSON.stringify(cart));

  // redirect to all order page

  location.href = "../../pages/user/previous-orders.html";
}

var placeOrderBtn = document.getElementById("placeOrderBtn");
placeOrderBtn.addEventListener("click", createOrder);

/******************************************************** Sign Out FUNCTION **************************************** */

function signout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../../pages/login.html";
}
