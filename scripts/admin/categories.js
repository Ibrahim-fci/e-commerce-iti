// check if user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"))
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

if (!currentUser || currentUser == null || currentUser.role != "admin") {
  location.href = "../../pages/login.html";
}

// func to render All Products

function renderCategories() {
  var categoriesContainer = document.getElementById("productsContainer");
  var categories = getCategoriess();

  categoriesContainer.innerHTML = "";

  var categoriesCards = categories.map((category) => {
    return `
      <div class="product-card">
        <div class="product-details">
          <div class="product-title"  category = "${category}">${category}</div>
          <div class="action-buttons">
            <button class="update-button" onclick="updatePopup('${category}')">Update</button>
            <button class="delete-button" onclick="">Delete</button>
          </div>
        </div>
      </div>
      `;
  });

  categoriesContainer.innerHTML = categoriesCards.join("");
}

function getCategoriess() {
  return (products = JSON.parse(localStorage.getItem("categories"))
    ? JSON.parse(localStorage.getItem("categories"))
    : []);
}

// get a product func
function getProduct(txt) {
  var categories = getCategoriess();
  return categories.find((category) => category == txt);
}

//add event listener when page is loaded
window.addEventListener("DOMContentLoaded", function () {
  renderCategories();
});

/************************************ ADD CATEGORIES */
// adding product popup
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function updatePopup(category) {
  // get popup form and set it with the product data
  var updateCategoryInput = document.getElementById("update-productId-input");
  var updateForm = document.getElementById("updateForm");
  updateForm.categoryName.value = category;
  updateCategoryInput.value = category;

  document.getElementById("updateForm-popup").style.display = "flex";
}

function closeUpdatePopup() {
  document.getElementById("updateForm-popup").style.display = "none";
}
