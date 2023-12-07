let Wishlishtdom = document.querySelector(".products");
function drawcartUi(allproducts = []) {
  let products = JSON.parse(localStorage.getItem("Wishlishtlist")) || allproducts;
    
  let productUI = products.map((item) => {
    return `
    <div class="product-item">
    <span style="display:none;">${item.id}</span>
    <span style="display:none;">${item.title}</span>
      <img src="${item.image}" alt="prodct" class="product-item-image>
      <div class="product-info">
        <h2>${item.category}</h2>
        <span style="display:none;">${item.description}</span>
        <p class="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <h3>${"$"+ item.price}</h3>
        <span style="display:none;">${item.rating.count}</span>
        <button id="btn-action" onclick="Removeitemfromcart(${item.id})">Remove from Wishlisht </button>
        
        </div>
        </div>
    `;
  });
  Wishlishtdom.innerHTML = productUI.join('');
}drawcartUi()

function Removeitemfromcart(id) {
  let productInwish = localStorage.getItem("Wishlishtlist");
  if (productInwish) {
    let items = JSON.parse(productInwish);
    let filtereditems = items.filter((item) => item.id !== id);
    localStorage.setItem("Wishlishtlist",JSON.stringify(filtereditems));
    drawcartUi(filtereditems);
  }
}

let cart= document.querySelector("#Cart")
let productnum=document.querySelector("#badge");  
let addeditems=localStorage.getItem("productsincart") ? JSON.parse(localStorage.getItem("productsincart")) : [];
productnum.innerHTML+=addeditems.length
cart.addEventListener("click",function(){
  window.location="cart.html";
})