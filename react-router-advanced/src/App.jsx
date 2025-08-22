import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"
import Profile from "./components/Profile"
import Blog from "./components/Blog"
import BlogPost from "./components/BlogPost"
import ProtectedRoute from "./components/ProtectedRoute"
import { fakeAuth } from "./auth"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(fakeAuth.isAuthenticated)

  const handleLogin = () => {
    fakeAuth.login(() => setIsLoggedIn(true))
  }

  const handleLogout = () => {
    fakeAuth.logout(() => setIsLoggedIn(false))
  }

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>

      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>

      <Routes>
        {/* Protected Profile route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Blog public routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* Default home */}
        <Route path="/" element={<h1>Welcome, please login to access Profile</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
