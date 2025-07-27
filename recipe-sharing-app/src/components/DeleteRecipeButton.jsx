import { useRecipeStore } from '../store/recipeStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DeleteRecipeButtonProps {
  recipeId: string;
  onDeleteSuccess?: () => void;
}

const DeleteRecipeButton = ({ recipeId, onDeleteSuccess }: DeleteRecipeButtonProps) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const [showConfirm, setShowConfirm] = useState(false);
   const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    if (onDeleteSuccess) {
      onDeleteSuccess();
      
    }
     navigate('/');
  };

  const handleConfirmClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#dc3545' }}>
          Are you sure?
        </span>
        <button
          onClick={handleDelete}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Yes, Delete
        </button>
        <button
          onClick={handleCancel}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConfirmClick}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px'
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;