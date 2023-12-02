var users = JSON.parse(localStorage.getItem("users")) || [];

// get submit button and add event listener
var loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", login);

// login function
function login(e) {
  e.preventDefault();

  var email = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // ...
  if (inputValidation(email, password) === false) {
    return;
  }

  // ... check if user exists
  var user = users.find(async function (user) {
    var comparePasswordResult = await comparePassword(password, user.password);

    if (user.email === email && comparePasswordResult === true) return user;
  });

  if (user) {
    delete user.password;
    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = "../../index.html";
  } else {
    renderError(["Wrong email or password"]);
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
