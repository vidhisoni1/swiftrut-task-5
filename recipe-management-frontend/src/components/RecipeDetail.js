import React, { useEffect, useState } from 'react';
import { getRecipeById } from '../services/recipeService';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeById(id);
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-center text-muted">Loading...</p>;

  return (
    <div className="container my-5">
      {recipe.image && (
        <img
          src={`https://swiftrut-task-5.onrender.com/${recipe.image}`}
          alt={recipe.title}
          className="img-fluid rounded mb-4"
          style={{ height: '400px', objectFit: 'cover', width: '100%' }}
        />
      )}

      <h1 className="text-center display-4 mb-4">{recipe.title}</h1>

      <div className="text-center mb-4">
        <h5 className="fw-bold">Ingredients:</h5>
        <p className="text-muted">{recipe.ingredients.join(', ')}</p>
      </div>

      <div className="text-center mb-4">
        <h5 className="fw-bold">Instructions:</h5>
        <p className="text-muted">{recipe.instructions}</p>
      </div>

      <div className="text-center mb-4">
        <h5 className="fw-bold">Cuisine:</h5>
        <p className="text-muted">{recipe.cuisineType}</p>
      </div>

      <div className="text-center mb-4">
        <h5 className="fw-bold">Cooking Time:</h5>
        <p className="text-muted">{recipe.cookingTime} minutes</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
