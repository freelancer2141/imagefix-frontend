# ⚛️ ImageFix — React Frontend

This directory contains the complete client-side React 19 application built with Vite, Tailwind CSS, Lucide icons, and Motion.

---

## 🛠️ Tech Stack
- **Framework**: React 19
- **Bundler / Dev Server**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Motion (`motion/react`)
- **HTTP Client**: Axios

---

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables (Optional)
Copy the example environment file:
```bash
cp .env.example .env
```
Default `.env` contents:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
The frontend will start at **`http://localhost:5173`** (or configured port) and automatically proxy `/api` requests to the backend server.

---

## 📦 Production Build

To build static optimized production files:
```bash
npm run build
```
The output will be generated in `frontend/dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Directory Structure
```text
frontend/
├── src/
│   ├── components/      # UI components (UploadZone, CompressTool, ResizeTool, ResultCard, etc.)
│   ├── pages/           # Page routes (Home, PrivacyPolicy, TermsOfService, etc.)
│   ├── utils/           # HTML5 Canvas image processing & binary search compression
│   ├── context/         # ThemeContext (Dark/Light mode) & state providers
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer (Axios)
│   ├── config/          # Preset exams & dimensions data
│   ├── App.jsx          # Root application component & routing
│   ├── main.jsx         # React DOM entry point
│   └── index.css        # Tailwind CSS imports & global design tokens
├── index.html           # Main HTML document template
├── package.json         # Frontend dependencies & scripts
├── package-lock.json    # Locked frontend dependencies
├── vite.config.js       # Vite configuration
└── README.md            # Frontend documentation (this file)
```
