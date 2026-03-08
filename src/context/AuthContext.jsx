import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(); // To create global auth storage
// We are creating a global box 📦
// This box will store:
// isAuthenticated
// login()
// logout()
// So any component in the app can use them.
// Without this → we would need prop drilling ❌

export const AuthProvider = ({children}) => {      // 🔷 3️⃣ Create the Provider Component
  // This is a wrapper component.
// It will wrap your whole app:

{/* <AuthProvider>
   <App />
</AuthProvider> */}
// So now every page can access auth data.

   const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔥 VERY IMPORTANT
  // ❓ Why we need this?
  // When user refreshes page:
  // React state becomes ❌ empty
  // But token still exists in localStorage ✅
  // So we check:
  // if token exists → user is still logged in
  // Otherwise user will be logged out after refresh 😭
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      try {
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000; // in seconds

        if(decoded.exp < currentTime)
        {
          // ❌ Token expired
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        } else {
          // ✅ Token valid
          setIsAuthenticated(true);
        }
      } catch(error) {
        // Invalid token format
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
  }, []); // Empty dependency array means 👉 Run ONLY once 👉 When app starts

  // 🧠 What happens when user logs in?
 // Step by step:
 // 1️⃣ Backend sends token
 // 2️⃣ We store token in localStorage
 // 3️⃣ We update React state → true
 // 4️⃣ Whole app re-renders
 // 5️⃣ Protected routes open 🔓
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // ✅ When logout:
  // Token removed
  // isAuthenticated = false
  // Redirect to login
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

// Right now:
// App manages auth state
// Passing setIsAuthenticated as prop
// This is called "prop drilling"
// Works for small app.
// But engineers use:
// Global Auth Context

// 🧠 What is Context API?
// Context API allows:
// Sharing global state across entire app
// without passing props manually.
// Perfect for:
// Authentication
// Theme
// Language

// We created AuthContext
// It provides:
// isAuthenticated
// login()
// logout()
// To entire app.

// 🔥 Step 2 — Wrap App with Provider
// In main.jsx:
// import { AuthProvider } from "./context/AuthContext";

// 🔥 Step 3 — Use Context in Components
// In Login.jsx
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// const { login } = useContext(AuthContext);