## Kadam (Vite • React)

A fast React setup powered by Vite.

### 🚀 Quick Start

1. **To Run the project on your local device**

   npm run dev

   Opens at [http://localhost:5173](http://localhost:5173) by default; hot‑reload on save.

### 🔧 Configuration

* **`public/`** → static assets (images, `manifest.json`, favicons) are copied unchanged.
* **Entry point**: `src/main.jsx`
* **Environment variables**:

  * Create `.env.local` (git‑ignored)
  * Prefix keys with `VITE_`, e.g. `VITE_FIREBASE_API_KEY=…`
  * Access via `import.meta.env.VITE_FIREBASE_API_KEY`