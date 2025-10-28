const products = [
  { id: 1, name: "Gundam RX-78-2", price: 850000, img: "./img/gundan.webp" },
  { id: 2, name: "Iron Man MK-50", price: 1200000, img: "./img/iron.jpg" },
  { id: 3, name: "Luffy Gear 5", price: 950000, img: "./img/luffy.jpg" },
  { id: 4, name: "Batman Arkham", price: 1100000, img: "./img/batman.jpg" },
  // Hàng 2
  { id: 5, name: "Saitama Figure", price: 950000, img: "./img/saitama.jpg" },
  { id: 6, name: "Deku Action Figure", price: 870000, img: "./img/deku.jpg" },
  { id: 7, name: "Sanji Figure", price: 910000, img: "./img/sanji.webp" },
  { id: 8, name: "Zoro Figure", price: 940000, img: "./img/zoro.jpg" }
];

const productList = document.getElementById("product-list");
const cartPanel = document.getElementById("cart-panel");
const overlay = document.getElementById("overlay");
const cartToggle = document.querySelector(".cart-toggle");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.querySelector(".cart-count");
let cart = [];

// ======== HIỂN THỊ SẢN PHẨM ========
function renderProducts() {
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "col-md-3 col-sm-6 mb-4";
    div.innerHTML = `
      <div class="product-item h-100 shadow-sm p-3 text-center rounded">
        <img src="${p.img}" alt="${p.name}" class="img-fluid mb-2 rounded">
        <h5 class="fw-bold">${p.name}</h5>
        <p class="text-danger fw-semibold mb-2">${p.price.toLocaleString()}₫</p>

        <div class="d-flex justify-content-center align-items-center mb-2">
          <label class="me-2 mb-0">Số lượng:</label>
          <input type="number" id="qty-${p.id}" class="form-control text-center" value="1" min="1" style="width:70px;">
        </div>

        <button class="btn btn-primary btn-sm w-100" onclick="addToCart(${p.id})">
          <i class="bi bi-cart-plus"></i> Thêm vào giỏ
        </button>
      </div>
    `;
    productList.appendChild(div);
  });
}

// ======== THÊM SẢN PHẨM VÀO GIỎ ========
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const qtyInput = document.getElementById(`qty-${id}`);
  const qty = parseInt(qtyInput.value) || 1;

  const exist = cart.find(i => i.id === id);
  if (exist) exist.qty += qty;
  else cart.push({ ...product, qty });

  updateCart();
  qtyInput.value = 1; // reset sau khi thêm
}

// ======== XÓA KHỎI GIỎ ========
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

// ======== CẬP NHẬT HIỂN THỊ GIỎ HÀNG ========
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item d-flex align-items-center mb-2";
    div.innerHTML = `
      <img src="${item.img}" class="me-2 rounded" style="width:50px;height:50px;object-fit:cover;">
      <div class="flex-grow-1">
        <h6 class="mb-0">${item.name}</h6>
        <small>${item.price.toLocaleString()}₫ x ${item.qty}</small>
      </div>
      <button class="remove-btn btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">×</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotalEl.textContent = total.toLocaleString() + "₫";
  cartCountEl.textContent = cart.length;
}

// ======== MỞ / ĐÓNG GIỎ ========
cartToggle.addEventListener("click", () => {
  cartPanel.classList.add("active");
  overlay.classList.add("active");
});

closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function closeCart() {
  cartPanel.classList.remove("active");
  overlay.classList.remove("active");
}

// ======== CHẠY LẦN ĐẦU ========
renderProducts();
// ======== ACTIVE MENU ITEM ========
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Xóa active ở tất cả các link
    navLinks.forEach(l => l.classList.remove('active'));
    // Thêm active cho link được click
    this.classList.add('active');
  });
});
// ======== ACTIVE MENU ITEM & AUTO CLOSE ON MOBILE ========

const navbarCollapse = document.getElementById('navbarNav'); // phần menu ẩn/hiện

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Xóa active cũ
    navLinks.forEach(l => l.classList.remove('active'));
    // Thêm active cho link hiện tại
    this.classList.add('active');

    // Nếu đang ở chế độ mobile thì tự đóng menu lại
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  });
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }
  alert("Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ sớm nhất.");
  cart = [];
  updateCart();
  closeCart();
});
