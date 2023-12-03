// check if user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"))
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

if (!currentUser || currentUser == null) {
  location.href = "../../pages/login.html";
}

// func to render All Products

function renderProducts() {
  var productsContainer = document.getElementById("productsContainer");
  var products = getAllProducts();

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
                <button class="update-button" onclick="updatePopup(${product.id})">Update</button>
                <button class="delete-button" onclick="deletePopup(${product.id})">Delete</button>
            </div>
        </div>`;
  });
}

function getAllProducts() {
  return (products = JSON.parse(localStorage.getItem("products"))
    ? JSON.parse(localStorage.getItem("products"))
    : []);
}

// get a product func
function getProduct(id) {
  var products = getAllProducts();
  return products.find((product) => product.id == id);
}

//add event listener when page is loaded
window.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  renderCategoriesOptions();
  renderCategoriesOptions2();
});

/****************************************************************************************************************************************** */
/*********************** POPups Section */
// adding product popup
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

//update Product popup

function updatePopup(id) {
  var product = getProduct(id);
  // get popup form and set it with the product data

  var image = document.getElementById("updateImage-popup");
  var updateForm = document.getElementById("updateForm");
  updateForm.productName.value = product.title;
  updateForm.price.value = product.price;
  updateForm.quantity.value = product.quantity;
  updateForm.description.value = product.description;
  image.setAttribute("src", product.image);

  // select the category
  var selectCategory = document.getElementById(
    "uppdateProductSelectCategories"
  );
  var optionToSelect = selectCategory.querySelector(
    'option[value="' + product.category + '"]'
  );
  optionToSelect.selected = true;
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

function renderCategoriesOptions() {
  var categories = JSON.parse(localStorage.getItem("categories"))
    ? JSON.parse(localStorage.getItem("categories"))
    : [];
  // Get the select element
  var selectElement = document.getElementById("uppdateProductSelectCategories");

  // Clear the existing options
  selectElement.innerHTML = "";

  // add categories options to the select element
  categories.forEach(function (category) {
    var option = document.createElement("option");
    option.value = category;
    option.text = category;
    selectElement.appendChild(option);
  });
}

function renderCategoriesOptions2() {
  var categories = JSON.parse(localStorage.getItem("categories"))
    ? JSON.parse(localStorage.getItem("categories"))
    : [];
  // Get the select element
  var selectElement = document.getElementById("addProductSelectCategories");

  // Clear the existing options
  selectElement.innerHTML = "";

  // add categories options to the select element
  categories.forEach(function (category) {
    var option = document.createElement("option");
    option.value = category;
    option.text = category;
    selectElement.appendChild(option);
  });
}

function displayImage(inputFileId, imgElementId) {
  // Get the file input element
  var input = document.getElementById(inputFileId);
  var imgElement = document.getElementById(imgElementId);

  // Check if files are selected
  if (input.files && input.files[0]) {
    // Get the selected file
    var selectedFile = input.files[0];

    // Get the URL of the selected file
    var imageURL = URL.createObjectURL(selectedFile);

    // Display the URL
    imgElement.setAttribute("src", imageURL);
    console.log(imgElement.getAttribute("src"));
  }
}
