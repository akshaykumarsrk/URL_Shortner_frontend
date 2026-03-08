import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthContext";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
// we have wrapped in AuthProvider
// Now entire app has access to auth state.

// React Router DOM allows us to move between pages in a React app without reloading the browser.
// In normal websites:

// example.com/about → new HTML page loads
// example.com/contact → again full page reload

// Every click = 🔄 full refresh.
// But in React SPA (Single Page Application) we don’t want reload.
// We want:
// ⚡ Fast navigation
// ⚡ No refresh
// ⚡ Smooth user experience
// 👉 That’s why we use React Router DOM.
