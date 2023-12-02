// user roles object
const UserRole = {
  ADMIN: "admin",
  USER: "user",
};

var users = JSON.parse(localStorage.getItem("users")) || [];

// get submit button and add event listener
var loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", login);

// login function
async function login(e) {
  e.preventDefault();

  var email = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // ...
  if (inputValidation(email, password) === false) {
    return;
  }

  // ... check if user exists
  var user = users.find((item) => {
    return item.email === email;
  });

  if (!user) {
    renderError(["Wrong email or password"]);
    return;
  }

  // ... check if password is correct
  var comparePasswordResult = await comparePassword(password, user.password);
  if (comparePasswordResult === false) {
    renderError(["Wrong email or password"]);
    return;
  }

  // store user in local storage
  delete user.password;
  localStorage.setItem("currentUser", JSON.stringify(user));
  console.log(user);

  if (user.role === UserRole.ADMIN) {
    location.href = "../pages/admin/allProduct.html";
  } else {
    location.href = "../../index.html";
  }
}

// validation function
function inputValidation(email, password) {
  // constants
  const errors = [];

  // validate inputs ____________________________________
  if (email === "" || password === "") {
    errors.push("Email and password can't be empty");
    return;
  }

  renderError(errors);
  return errors.length === 0;
}

function renderError(errors) {
  var errorsContainer = document.getElementById("validation-error");

  if (errors.length > 0) {
    errorsContainer.style.display = "block";

    var errorItems = "";
    for (var i = 0; i < errors.length; i++) {
      console.log(errors[i]);
      errorItems += "<p class='item'>" + errors[i] + "</p>";
    }
    errorsContainer.innerHTML = errorItems;
  } else {
    errorsContainer.style.display = "none";
  }
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  var userPasswordInputValue = await hashPassword(password);
  return userPasswordInputValue === hashedPassword;
}
