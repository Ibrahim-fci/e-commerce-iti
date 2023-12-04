// check if user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"))
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

if (!currentUser || currentUser == null || currentUser.role != "admin") {
  location.href = "../../pages/login.html";
}

// func to render All Products

function renderProducts() {
  var productsContainer = document.getElementById("productsContainer");
  var products = getAllProducts();

  productsContainer.innerHTML = "";

  var productCards = products.map((product) => {
    return `
    <div class="product-card">
      <img
        src="${product.image}"
        alt="${product.title}"
        class="product-image"
        onclick="updatePopup(${product.id})"

      />
      <div class="product-details">
        <div class="product-title">${product.title}</div>
        <div class="product-price">$${product.price}</div>
        <div class="product-category">${product.category}</div>
        <div class="product-quantity">
          In Stock: ${product.quantity} units
        </div>
          <p class="product-description">${product.description}</p>
          <div class="action-buttons">
          <button class="update-button" onclick="updatePopup(${product.id})">Update</button>
          <button class="delete-button" onclick="deletePopup(${product.id})">Delete</button>
        </div>
      </div>
    </div>
    `;
  });

  productsContainer.innerHTML = productCards.join("");
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
  updateForm.productId.value = product.id;
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

function deletePopup(id) {
  var product = getProduct(id);
  var deleteInputId = document.getElementById("delete-productId-input");
  var deleteProductName = document.getElementById("delete-productName");

  deleteInputId.value = id;
  deleteProductName.innerHTML = product.title;
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
  }
}

function validateFloat(input) {
  // Remove any non-numeric characters except dot (.)
  input.value = input.value.replace(/[^0-9.]/g, "");

  // Ensure that there's at most one dot
  var dotCount = input.value.split(".").length - 1;
  if (dotCount > 1) {
    // If more than one dot, remove the extra dots
    input.value = input.value.slice(0, input.value.lastIndexOf("."));
  }
}

/******************************************************** UPDATE PRODUCT FUNCTION **************************************** */
function updateProduct() {
  //   e.preventDefault();
  var updateForm = document.getElementById("updateForm");
  var updateImagePopup = document.getElementById("updateImage-popup");
  var products = getAllProducts();
  var product = getProduct(updateForm.productId.value);

  product.title = updateForm.productName.value;
  product.price = updateForm.price.value;
  product.quantity = updateForm.quantity.value;
  product.description = updateForm.description.value;
  product.category = updateForm.category.value;
  product.image = updateImagePopup.getAttribute("src");

  var index = products.findIndex(
    (product) => product.id === parseInt(updateForm.productId.value)
  );

  console.log(index);

  products[index] = product;
  console.log(products);

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

var updateSubmitBtn = document.getElementById("updateProduct-submit-btn");
updateSubmitBtn.addEventListener("click", updateProduct);

/******************************************************** Delete PRODUCT FUNCTION **************************************** */

function deleteProduct() {
  var deleteInputId = document.getElementById("delete-productId-input").value;
  var products = getAllProducts();
  var index = products.findIndex(
    (product) => product.id === parseInt(deleteInputId)
  );

  //delete product by index
  products.splice(index, 1);

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();

  closeDeletePopup();
}

/******************************************************** Add PRODUCT FUNCTION **************************************** */

function addProduct() {
  console.log(validateAddProductFormData());
  // validate data
  if (validateAddProductFormData() === false) {
    return;
  }

  var image = document.getElementById("add-popup-imageId");
  var addForm = document.getElementById("addForm");
  var products = getAllProducts();

  //add product
  products.push({
    id: getLastId() + 1,
    title: addForm.productName.value,
    price: addForm.price.value,
    quantity: addForm.quantity.value,
    description: addForm.description.value,
    category: addForm.category.value,
    image: image.getAttribute("src"),
  });

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();

  closePopup();
}

var addProductBtn = document.getElementById("addProductBtn");
addProductBtn.addEventListener("click", addProduct);

/// func t o get last id in products collection
function getLastId() {
  var products = getAllProducts();
  var maxnum = 0;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id > maxnum) {
      maxnum = products[i].id;
    }
  }

  return maxnum;
}

// func to validate form data
function validateAddProductFormData() {
  var addForm = document.getElementById("addForm");

  var productName = addForm.productName.value;
  var price = addForm.price.value;
  var quantity = addForm.quantity.value;
  var description = addForm.description.value;
  var category = addForm.category.value;

  if (
    productName == "" ||
    price == "" ||
    quantity == "" ||
    description == "" ||
    category == ""
  ) {
    return false;
  }

  return true;
}

/******************************************************** Sign Out FUNCTION **************************************** */

function signout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../../pages/login.html";
}

/******************************************************** Search FUNCTION **************************************** */

function search() {
  var searchInput = document.getElementById("search-input").value;
  var products = getAllProducts();

  var filteredProducts = products.filter(function (product) {
    if (product.title.toLowerCase().includes(searchInput.toLowerCase())) {
      return product;
    } else if (
      product.category.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return product;
    } else if (
      product.description.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return product;
    } else if (product.price == searchInput) {
      return product;
    }
  });

  renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(products) {
  var productsContainer = document.getElementById("productsContainer");

  productsContainer.innerHTML = "";

  var productCards = products.map((product) => {
    return `
    <div class="product-card">
      <img
        src="${product.image}"
        alt="${product.title}"
        class="product-image"
        onclick="updatePopup(${product.id})"

      />
      <div class="product-details">
        <div class="product-title">${product.title}</div>
        <div class="product-price">$${product.price}</div>
        <div class="product-category">${product.category}</div>
        <div class="product-quantity">
          In Stock: ${product.quantity} units
        </div>
          <p class="product-description">${product.description}</p>
          <div class="action-buttons">
          <button class="update-button" onclick="updatePopup(${product.id})">Update</button>
          <button class="delete-button" onclick="deletePopup(${product.id})">Delete</button>
        </div>
      </div>
    </div>
    `;
  });

  productsContainer.innerHTML = productCards.join("");
}

var searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", search);
