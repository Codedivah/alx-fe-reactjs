import React from 'react';
import { useRecipeStore } from '../store/recipeStore';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useRecipeStore(state => ({
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm
  }));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div style={{ 
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search recipes by title or description..."
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #e1e5e9',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007bff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e1e5e9';
          }}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#6c757d',
              padding: '0',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;