import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Corrected imports
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import Profile from './components/Profile'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/Profile">Profile</Link></li>
            <li><Link to="/ProfileSettings">Settings</Link></li>
            <li><Link to="/ProfileDetails">Details</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>

        <Routes>
          {/* Profile route */}
          <Route path="/Profile" element={<Profile />} />

          {/* Blog list route */}
          <Route path="/blog" element={<Blog />} />

          {/* Dynamic blog post route */}
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </BrowserRouter>
  )
}

export default App
