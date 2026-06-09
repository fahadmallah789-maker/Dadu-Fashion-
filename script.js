let products = [
  { id: 1, name: "T-Shirt", price: 20 },
  { id: 2, name: "Jeans", price: 40 },
  { id: 3, name: "Jacket", price: 60 },
  { id: 4, name: "Sneakers", price: 80 }
];

// cart load
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// update cart icon
function updateCart() {
  let cartBadge = document.getElementById("cartBadge");
  if (cartBadge) {
    cartBadge.innerText = cart.length;
  }
}

// render products
function renderProducts() {
  let grid = document.getElementById("featuredProductsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// add to cart
function addToCart(id) {
  let product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// login fake system
function login() {
  localStorage.setItem("user", "loggedin");
  alert("Login successful!");
}

// signup fake system
function signup() {
  alert("Account created!");
}

// init
renderProducts();
updateCart();
