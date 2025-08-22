// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"
import { fakeAuth } from "../auth"

function ProtectedRoute({ children }) {
  if (!fakeAuth.isAuthenticated) {
    // if not logged in, redirect to home or login page
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute
