import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="row">
      {recipes.map(recipe => (
        <div className="col-md-4 mb-4" key={recipe._id}>
          <div className="card shadow-sm ">
            <div className="card-body">
              <h5 className="card-title text-secondary">{recipe.title}</h5>
              <p className="card-text text-secondary">
                Cuisine: {recipe.cuisine}<br />
                Cooking Time: {recipe.cookingTime} minutes
              </p>
              <Link to={`/recipes/${recipe._id}`} className="btn btn-info text-secondary">View Recipe</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
