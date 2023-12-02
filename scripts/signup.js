// user roles object
const UserRole = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
};

// users array from local storage
var users = JSON.parse(localStorage.getItem("users")) || [];

// get submit button and add event listener
var signupBtn = document.getElementById("btn-signup");
signupBtn.addEventListener("click", signup);

// signup function
async function signup(e) {
  e.preventDefault();

  // inputs values
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // check if inputs are valid
  if (inputValidation(username, email, password, confirmPassword) === false) {
    return;
  }

  // add user to users array_____________________________________________
  users.push({
    username: username,
    email: email,
    password: await hashPassword(password),
    role: UserRole.USER,
  });

  // store users array in local storage
  localStorage.setItem("users", JSON.stringify(users));

  // redirect to login page_____________________________________________
  location.href = "../pages/login.html";
}

// validation function
function inputValidation(username, email, password, confirmPassword) {
  // constants
  const errors = [];
  const userNameRegExp = /^[a-zA-Z0-9]+$/;

  // validate inputs ____________________________________
  if (password !== confirmPassword) {
    errors.push("Passwords do not match");
  }

  if (!matchRegExp(userNameRegExp, username)) {
    errors.push("Username must be alphanumeric");
  }

  // check if username already exists_____________________________________
  var userIsExists = userIsExist(email, users);
  if (userIsExists) {
    errors.push("User with this email already exists");
  }

  if (email === "") {
    errors.push("Email can't be empty");
  }

  if (password === "") {
    errors.push("password can't be empty");
  }

  renderError(errors); // render errors if there is a validation errors

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

function userIsExist(email, users) {
  return users.some(function (user) {
    return user.email === email;
  });
}

function matchRegExp(regExp, value) {
  return regExp.test(value);
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
