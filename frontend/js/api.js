const API_BASE = "/api";

function apiAvailable() {
  return location.protocol !== "file:";
}

async function fetchProducts(category = null) {
  if (!apiAvailable()) throw new Error("file protocol");
  let url = `${API_BASE}/products`;
  if (category) url += `?category=${category}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

async function fetchProduct(id) {
  if (!apiAvailable()) throw new Error("file protocol");
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

async function fetchCategories() {
  if (!apiAvailable()) throw new Error("file protocol");
  const res = await fetch(`${API_BASE}/categories`);
  return res.json();
}

async function submitContact(data) {
  if (!apiAvailable()) throw new Error("file protocol");
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
