import React, { useEffect, useState } from 'react';
import { getMyRecipes, deleteRecipe } from '../services/recipeService';
import { Link, useNavigate } from 'react-router-dom';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view your recipes');
        navigate('/login');
        return;
      }

      try {
        const data = await getMyRecipes(token); // Fetch user-specific recipes
        setRecipes(data);
      } catch (error) {
        setError('Failed to fetch recipes');
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [navigate]);

  const handleDelete = async (recipeId) => {
    const token = localStorage.getItem('token');
    try {
      await deleteRecipe(recipeId, token);
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId)); // Remove deleted recipe from state
      alert('Recipe deleted successfully');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe');
    }
  };

  if (loading) {
    return <div className="container p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container p-6 text-danger">{error}</div>;
  }

  return (
    <div className="container p-5">
      <h1 className="text-center mb-5 display-4 text-secondary">My Recipes</h1>

      {recipes.length > 0 ? (
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="col-md-4 mb-4">
              <div className="card h-100">
                {recipe.image && (
                  <img
                    src={`http://localhost:5000/${recipe.image}`}
                    alt={recipe.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-secondary">{recipe.title}</h5>
                  <p className="card-text text-secondary">
                    {recipe.ingredients.join(', ')}
                  </p>
                  <Link
                    to={`/recipes/${recipe._id}/edit`}
                    className="btn btn-warning me-2 text-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="btn btn-danger "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <p className="lead text-muted">You haven't created any recipes yet.</p>
          <Link
            to="/create"
            className="btn btn-primary"
          >
            Create Your First Recipe
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
