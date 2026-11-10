document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("product-grid");
  const chips = document.querySelectorAll(".chip");
  const cartCountEl = document.getElementById("cart-count");

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!Array.isArray(cart)) cart = [];
  } catch (e) {
    cart = [];
  }
  cartCountEl.textContent = cart.length;

  // Embedded fallback so the site works even without the API / when opened as a file
  const FALLBACK_PRODUCTS = [
    { id: 1, name: "Velvet Lip Tint", price: 499, image: "assets/images/products/product-1.png", category: "lips" },
    { id: 2, name: "Glow Serum", price: 699, image: "assets/images/products/product-2.png", category: "skin" },
    { id: 3, name: "Soft Blush", price: 599, image: "assets/images/products/product-3.png", category: "face" },
    { id: 4, name: "Matte Lipstick", price: 549, image: "assets/images/products/product-4.png", category: "lips" },
    { id: 5, name: "Kajal Pencil", price: 299, image: "assets/images/products/product-5.png", category: "eyes" },
    { id: 6, name: "Hydrating Cream", price: 799, image: "assets/images/products/product-6.png", category: "skin" },
    { id: 7, name: "Liquid Eyeliner", price: 399, image: "assets/images/products/product-7.png", category: "eyes" },
    { id: 8, name: "Foundation", price: 899, image: "assets/images/products/product-8.png", category: "face" },
    { id: 9, name: "Lip Balm", price: 199, image: "assets/images/products/product-9.png", category: "lips" },
    { id: 10, name: "Mascara", price: 449, image: "assets/images/products/product-10.png", category: "eyes" },
    { id: 11, name: "Face Mist", price: 349, image: "assets/images/products/product-11.png", category: "skin" },
    { id: 12, name: "Concealer", price: 649, image: "assets/images/products/product-12.png", category: "face" },
    { id: 13, name: "Lip Gloss", price: 329, image: "assets/images/products/product-13.png", category: "lips" },
    { id: 14, name: "Eyebrow Gel", price: 299, image: "assets/images/products/product-14.png", category: "eyes" },
    { id: 15, name: "Night Cream", price: 849, image: "assets/images/products/product-15.png", category: "skin" },
    { id: 16, name: "Setting Powder", price: 599, image: "assets/images/products/product-16.png", category: "face" },
    { id: 17, name: "Rose Face Oil", price: 749, image: "assets/images/products/product-17.png", category: "skin" }
  ];

  function normalizeImage(path) {
    // API returns "/assets/..."; keep it when served, but for file:// use relative
    if (!path) return "";
    if (location.protocol === "file:" && path.startsWith("/")) {
      return path.slice(1);
    }
    return path;
  }

  function renderProducts(products) {
    grid.innerHTML = "";
    if (!products.length) {
      grid.innerHTML = '<p class="loading">No products in this category yet.</p>';
      return;
    }
    products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-img">
          <img src="${normalizeImage(p.image)}" alt="${p.name}" loading="lazy" onerror="this.style.opacity=0.2" />
        </div>
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <button class="btn-small" data-id="${p.id}">Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  }

  function setActiveChip(category) {
    chips.forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.category === category);
    });
  }

  async function render(category = "all") {
    setActiveChip(category);
    grid.innerHTML = '<p class="loading">Loading products...</p>';

    const cat = category === "all" ? null : category;

    if (typeof fetchProducts === "function") {
      try {
        const data = await fetchProducts(cat);
        renderProducts(data.products);
        return;
      } catch (err) {
        // API not available — fall through to embedded data
      }
    }

    const list = cat
      ? FALLBACK_PRODUCTS.filter((p) => p.category === cat)
      : FALLBACK_PRODUCTS;
    renderProducts(list);
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => render(chip.dataset.category));
  });

  grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-small")) {
      const id = e.target.dataset.id;
      cart.push(id);
      try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (err) {}
      cartCountEl.textContent = cart.length;
      const original = "Add to Cart";
      e.target.textContent = "✓ Added!";
      e.target.disabled = true;
      setTimeout(() => {
        e.target.textContent = original;
        e.target.disabled = false;
      }, 1200);
    }
  });

  render("all");
});
