import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { AuthContext  } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'
import Navbar from './components/Navbar'

const App = () => {

  const { isAuthenticated } = useContext(AuthContext);  

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>

<Route
  path="/"
  element={
    isAuthenticated
      ? <Navigate to="/dashboard" />
      : <Navigate to="/login" />
  }
/>

<Route
  path="/login"
  element={
    isAuthenticated
      ? <Navigate to="/dashboard" />
      : <Login />
  }
/>

<Route
  path="/register"
  element={
    isAuthenticated
      ? <Navigate to="/dashboard" />
      : <Register />
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

</Routes>
    </BrowserRouter>
  )
}

export default App

// 🧠 Correct Logic
// When user refreshes page:
// We must check:
// Is token present in localStorage?

// Case 1: Token exists
// → User is considered logged in
// → Redirect to dashboard

// Case 2: Token does NOT exist
// → Redirect to login
// So the real rule is:
// Dashboard only if authenticated.
// Not “always show dashboard”.
// That’s security thinking.

// 🧠 Now Let's Think Like Engineer
// Problem:
// If user manually types:
// /dashboard
// What happens?
// If no token → redirected to login.
// Correct.

// 🧠 But There’s One More Improvement
// What if user already logged in
// and tries to visit /login?
// Should we allow?
// No.
// We should redirect to dashboard.
// That is polished UX thinking.


// But routing-level authentication check
// belongs in App or ProtectedRoute component.
// Why?
// Because authentication is app-level concern, not page-level.
// This is architecture thinking.