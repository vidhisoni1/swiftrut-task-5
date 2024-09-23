import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card p-4 sh">
      <h2>{recipe.title}</h2>
      <p className='text-secondary'><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p className='text-secondary'><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
      <p className='text-secondary'><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p className='text-secondary'><strong>Instructions:</strong> {recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
