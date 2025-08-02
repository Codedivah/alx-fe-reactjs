import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="text-center p-4">
              <h1 className="text-3xl font-bold text-blue-600">Hello Tailwind!</h1>
              <Home />
            </div>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
