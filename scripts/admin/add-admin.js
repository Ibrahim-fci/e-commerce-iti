// check if user logged in
var currentUser = JSON.parse(localStorage.getItem("currentUser"))
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

if (!currentUser || currentUser == null || currentUser.role != "admin") {
  location.href = "../../pages/login.html";
}

function renderUsers() {
  var users = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  var usersContainer = document.getElementById("userssContainer");
  usersContainer.innerHTML = "";

  users.map((user) => {
    usersContainer.innerHTML += `
        <div class="user-item">
            <div class="user-details">
            <h1>${user.username}</h1>
            </div>

            <div class="addAdminBtn">
            <input type="hidden" id="userId" value="${user.id}">

            ${
              user.role == "admin"
                ? ""
                : `<button id='makeAdminBtn' onclick='addAdmin(${user.id})'>Make Admin</button>`
            }
            </div>
        </div>
        
        `;
  });
}

document.addEventListener("DOMContentLoaded", renderUsers);

/******************************************************** Sign Out FUNCTION **************************************** */

function signout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../../pages/login.html";
}

function addAdmin(id) {
  var users = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  var user = users.find((user) => user.id == id);
  user.role = "admin";

  users = updateObjectById(users, id, { role: "admin" });

  console.log(users);
  localStorage.setItem("users", JSON.stringify(users));

  renderUsers();
}

function updateObjectById(array, idToUpdate, updatedValues) {
  return array.map((obj) => {
    if (obj.id === idToUpdate) {
      // If the object's ID matches the ID to update, merge it with updated values
      return { ...obj, ...updatedValues };
    }
    return obj; // Otherwise, return the original object
  });
}
