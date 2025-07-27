
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import RecipeList from './components/RecipeList.jsx'
import AddRecipeForm from './components/AddRecipeForm.jsx'
import useRecipeStore from './components/recipeStore.js'

function App() {
  
  const recipes = useRecipeStore((state) => state.recipes)


  return (
    <>
    <nav>
        <Link to="/">Recipes</Link>
      </nav>
      <div>
       <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipeForm />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  )

      </div>
      <RecipeList/>
      <AddRecipeForm/>
      
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
    </>
  )
}

export default App
