# beautyBUT — Cosmetic Store Website

A clean, premium beauty e-commerce showcase built with **FastAPI (Python)** + **HTML/CSS/Vanilla JS**.

Designed & developed by **Raj Gautam** — graj13099@gmail.com · +91 95557 85729

---

## Quick Start

```bash
cd ~/Desktop/raj/butyBUT
bash run.sh
```

Then open: **http://localhost:8000/**

The script creates the virtual environment, installs dependencies (only first time), and starts the server.

---

## Two ways to use

1. **Full experience (recommended)** — run `bash run.sh`, open `http://localhost:8000/`.
   Products load from the API, everything works.

2. **Quick preview** — just double-click `index.html`. It opens directly in the browser
   (products render from built-in fallback data; contact links use email/phone).

---

## URLs

| URL | What |
|-----|------|
| `/` | Homepage with product grid + category filter |
| `/frontend/pages/about.html` | About page with developer card |
| `/api/products` | All products (JSON) |
| `/api/products?category=lips` | Filtered products |
| `/api/products/{id}` | Single product |
| `/api/categories` | Category list with counts |
| `/api/contact` | Contact form (POST) |
| `/api/health` | Health check |
| `/docs` | Interactive API docs (Swagger) |

---

## Project Structure

```
butyBUT/
├── index.html                  Root homepage
├── run.sh                      One-command start script
├── frontend/
│   ├── css/style.css           All styles
│   ├── js/api.js               API fetch helpers
│   ├── js/main.js              Product render + cart + fallback data
│   ├── pages/about.html        About page
│   └── data/fallback-products.json
├── backend/
│   ├── app/main.py             FastAPI app + static serving
│   ├── app/routes/             products.py, contact.py, health.py
│   ├── app/models/             Pydantic models
│   ├── app/data/products.json  Product database (edit here to add products)
│   └── requirements.txt
├── assets/images/
│   ├── logo.png
│   ├── raj.jpg
│   └── products/product-1..17.png
└── docs/
```

---

## Add / edit products

Edit `backend/app/data/products.json` and add a new object:

```json
{ "id": 18, "name": "New Product", "price": 499,
  "image": "/assets/images/products/product-18.png",
  "category": "lips", "in_stock": true }
```

Also add the product to the `FALLBACK_PRODUCTS` array in `frontend/js/main.js`
(so the direct-file preview stays in sync). Restart the server if not using `--reload`.

---

## Manual run (without run.sh)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
