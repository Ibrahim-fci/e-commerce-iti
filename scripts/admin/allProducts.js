// check if user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"))
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

if (!currentUser || currentUser == null) {
  location.href = "../../pages/login.html";
}

// func to render All Products
function renderProducts() {
  var products = JSON.parse(localStorage.getItem("products"))
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  var productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML += products.map((product) => {
    return `
        <div class="product-card">
            <img
            src="${product.image}"
            alt="${product.title}"
            class="product-image"
            />
            <div class="product-details">
            <div class="product-title">${product.title}</div>
            <div class="product-price">$${product.price}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-quantity">In Stock: ${product.quantity} units</div>
            <p class="product-description">
                ${product.description}
            </p>
            <div class="action-buttons">
                <button class="update-button" onclick="updatePopup()">Update</button>
                <button class="delete-button" onclick="deletePopup()">Delete</button>
            </div>
        </div>`;
  });
}

renderProducts();
/*********************** POPups Section */
// adding product popup
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

//update Product popup

function updatePopup() {
  document.getElementById("updateForm-popup").style.display = "flex";
}

function closeUpdatePopup() {
  document.getElementById("updateForm-popup").style.display = "none";
}

//Delete Product popup

function deletePopup() {
  document.getElementById("delete-popup").style.display = "flex";
}

function closeDeletePopup() {
  document.getElementById("delete-popup").style.display = "none";
}
