import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Router>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#333'
        }}>
          Recipe Sharing App
        </h1>
        
        <Routes>
          <Route path="/" element={
            <div>
              <SearchBar />
              <div style={{ marginBottom: '30px' }}>
                <h2>Add New Recipe</h2>
                <AddRecipeForm />
              </div>
              <RecipeList />
            </div>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;