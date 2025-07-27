import { useRecipeStore } from '../store/recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const { filteredRecipes, searchTerm } = useRecipeStore(state => ({
    filteredRecipes: state.filteredRecipes,
    searchTerm: state.searchTerm
  }));

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0 }}>
          {searchTerm ? `Search Results (${filteredRecipes.length})` : 'Recipe List'}
        </h2>
        {searchTerm && (
          <span style={{ 
            fontSize: '14px', 
            color: '#6c757d',
            fontStyle: 'italic'
          }}>
            Searching for: "{searchTerm}"
          </span>
        )}
      </div>
      
      {filteredRecipes.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: '#6c757d'
        }}>
          {searchTerm ? (
            <div>
              <p style={{ fontSize: '18px', marginBottom: '10px' }}>
                No recipes found matching "{searchTerm}"
              </p>
              <p style={{ fontSize: '14px' }}>
                Try searching with different keywords or check your spelling.
              </p>
            </div>
          ) : (
            <p style={{ fontSize: '18px' }}>
              No recipes yet. Add your first recipe!
            </p>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} style={{ 
              border: '1px solid #e1e5e9', 
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <h3 style={{ 
                margin: '0 0 12px 0',
                fontSize: '20px',
                color: '#333'
              }}>
                {recipe.title}
              </h3>
              <p style={{ 
                margin: '0 0 16px 0',
                color: '#666',
                lineHeight: '1.5',
                fontSize: '14px'
              }}>
                {recipe.description.length > 150 
                  ? `${recipe.description.substring(0, 150)}...` 
                  : recipe.description
                }
              </p>
              <Link 
                to={`/recipe/${recipe.id}`}
                style={{ 
                  color: '#007bff', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;