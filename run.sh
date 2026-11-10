#!/usr/bin/env bash
# beautyBUT — one-command starter
set -e
cd "$(dirname "$0")/backend"

if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv venv
fi

source venv/bin/activate

if ! python -c "import fastapi" >/dev/null 2>&1; then
  echo "Installing dependencies..."
  pip install -r requirements.txt
fi

echo ""
echo "=========================================="
echo "  beautyBUT is starting..."
echo "  Open:  http://localhost:8000/"
echo "  About: http://localhost:8000/frontend/pages/about.html"
echo "  Docs:  http://localhost:8000/docs"
echo "  (Press Ctrl+C to stop)"
echo "=========================================="
echo ""

exec uvicorn app.main:app --host 0.0.0.0 --port 8000
