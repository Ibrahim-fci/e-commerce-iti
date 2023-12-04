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
            <button class="delete-button" onclick="deletePopup('${category}')">Delete</button>
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

/********************************** ADD A NEW CATEGORIES */
function addCategory() {
  var addForm = document.getElementById("addForm");
  var categories = getCategoriess();

  // check if category already exists
  if (getProduct(addForm.categoryName.value)) {
    alert("Category already exists");
    return;
  }

  categories.push(addForm.categoryName.value);
  localStorage.setItem("categories", JSON.stringify(categories));
  //   renderCategories();
}

var addProductBtn = document.getElementById("addProductBtn");
addProductBtn.addEventListener("click", addCategory);

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

/**************** UPDATE CATEGORIES */

function updateCategory() {
  var oldCategoryName = document.getElementById("update-productId-input");
  var updateForm = document.getElementById("updateForm");
  var categories = getCategoriess();
  var products = getAllProducts();

  var index = categories.findIndex(
    (category) => category == oldCategoryName.value
  );

  categories[index] = updateForm.categoryName.value;

  // update all products with this category to the new category
  products = products.map((product) => {
    if (product.category == oldCategoryName.value) {
      product.category = updateForm.categoryName.value;
    }
    return product;
  });

  oldCategoryName.value = updateForm.categoryName.value;
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("products", JSON.stringify(products));
}

var updateCategoryBtn = document.getElementById("updateCategoryBtn");
updateCategoryBtn.addEventListener("click", updateCategory);

// get all productss
function getAllProducts() {
  return (products = JSON.parse(localStorage.getItem("products"))
    ? JSON.parse(localStorage.getItem("products"))
    : []);
}

/********************* DELETE CATEGORIES */
function deletePopup(category) {
  var categoryNamePopup = document.getElementById("delete-categoryName");
  var iddenInput = document.getElementById("delete-categort-hidden-input");
  iddenInput.value = category;
  categoryNamePopup.innerHTML = category;
  document.getElementById("delete-popup").style.display = "flex";
}

function closeDeletePopup() {
  document.getElementById("delete-popup").style.display = "none";
}

function deleteCategory() {
  var iddenInput = document.getElementById("delete-categort-hidden-input");
  var categories = getCategoriess();
  var products = getAllProducts();

  var index = categories.findIndex((category) => category == iddenInput.value);

  // delete all products with this category
  products = products.filter((product) => product.category != iddenInput.value);
  categories.splice(index, 1); // remove category

  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("products", JSON.stringify(products));

  closeDeletePopup();
  renderCategories();
}
