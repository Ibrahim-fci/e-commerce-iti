////////open fake api to retrive data///////////////////

function getProducts() {
  var xHTTP = new XMLHttpRequest();
  xHTTP.open("GET", "https://fakestoreapi.com/products", true);
  xHTTP.send();
  xHTTP.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      var data = JSON.parse(this.responseText);
      localStorage.setItem("products", JSON.stringify(data));
      var extractedProducts = data.map(function (product) {
        return {
          id: product.id,
          title: product.title,
          image: product.image,
          category: product.category,
          description: product.description,
          price: product.price,
          stockQuantity: product.rating.count,
        };
      });
      localStorage.setItem("product_list", JSON.stringify(extractedProducts));

      var categories = data.reduce(function (acc, product) {
        if (!acc.includes(product.category)) {
          acc.push(product.category);
        }
        return acc;
      }, []);
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  };
}

// Call the function
// getProducts();

//saved data in local storage and retrive it

var products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [];

var currentUser = JSON.parse(localStorage.getItem("currentUser"));

var productsContainer = document.getElementById("products");

// function to display product searched
var productDiv = document.querySelector(".products");
var displayproducts;
displayproducts = function (products = []) {
  var prodctList = products.map((item) => {
    return `
      <div class="products">
      <div class="product-item">
        <span style="display:none;">${item.id}</span>
        <span style="display:none;">${item.title}</span>
        <img src="${item.image}" alt="prodct" class="product-item-image>
        <div class="product-info">
          <h2>${item.category}</h2>
          <span style="display:none;">${item.description}</span>
          <p class="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          <h3>${"$" + item.price}</h3>
          <span style="display:none;">${item.rating.count}</span>
          <button id="btn-action" onclick="addtocart(${
            item.id
          })">Add to card</button>
          <button class="btn-icon" onclick="addtoWishlisht(${
            item.id
          })"><ion-icon name="heart-outline" class="fav-icon"></ion-icon></button>
        </div>
      </div>
    </div>
    </div>
    `;
  });
  productDiv.innerHTML = prodctList;
};
products;

//to search on item
function searchitem(title, searcharr) {
  if (title === "all") {
    displayproducts(products);
  } else {
    let arr = searcharr.filter((item) => item.category === title);
    displayproducts(arr);
  }
}

//////////when search empty??????///////////////////////////

var btnvalue = document.getElementById("search");

btnvalue.addEventListener("click", function () {
  var inputvalue = document.getElementById("search-input").value;
  searchitem(inputvalue, products);
  console.log(inputvalue);
});

function filterProduct(value) {
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    if (value == button.innerText) {
      searchitem(value, products);
    }
  });
}

displayproducts(products);

//add to cart
let cart = document.querySelector("#Cart");
let productnum = document.querySelector("#badge");
let addeditems = localStorage.getItem("productsincart")
  ? JSON.parse(localStorage.getItem("productsincart"))
  : [];
productnum.innerHTML += addeditems.length;
cart.addEventListener("click", function () {
  window.location = "cart.html";
});
function addtocart(id) {
  let choosenItem = products.find((product) => product.id === id);
  // addeditems = [...addeditems, choosenItem];
  isLogin();
  addeditems.push({
    ...choosenItem,
    quantity: 1,
    userEmail: currentUser.email,
  });
  localStorage.setItem("productsincart", JSON.stringify(addeditems));
  productnum.innerHTML = addeditems.length;
}
//add to Wishlisht
let Wishlisht = document.querySelector("#Wishlisht");
let Wishlishtnum = document.querySelector("#Wishlishtbadge");
let addedWishlisht = localStorage.getItem("Wishlishtlist")
  ? JSON.parse(localStorage.getItem("Wishlishtlist"))
  : [];
Wishlishtnum.innerHTML += addedWishlisht.length;
Wishlisht.addEventListener("click", function () {
  window.location = "Wishlisht.html";
});
function addtoWishlisht(id) {
  let choosenItem = products.find((product) => product.id === id);
  addedWishlisht = [...addedWishlisht, choosenItem];
  localStorage.setItem("Wishlishtlist", JSON.stringify(addedWishlisht));
  Wishlishtnum.innerHTML = addedWishlisht.length;
}

/******************************************************** Sign Out FUNCTION **************************************** */

function signout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../../pages/login.html";
}

// check is login
function isLogin() {
  // check if user logged in
  var currentUser = JSON.parse(localStorage.getItem("currentUser"))
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;

  if (!currentUser || currentUser == null) {
    location.href = "../../pages/login.html";
  }
}

///
function showCart() {
  location.href = "../../pages/user/cart.html";
}
