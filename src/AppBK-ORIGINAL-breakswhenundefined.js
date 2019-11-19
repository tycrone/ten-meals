import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './css/App.css';

const App = () =>{

  const APP_ID = "26b09e23";
  const APP_KEY = "ab0fb712cdb2f2d1bfbf7e5cf4670a0d";

  const [recipes, setRecipes] = useState([]);
  const [recipesTest, setRecipesTest] = useState(["none"]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState("salad");

  useEffect( () => {getRecipes();}, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => { //event
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

return(
  <div className="App">
    <h1 className="title">Meal Finder</h1>
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
      <button className="search-button" type="submit">SEARCH</button>
    </form>
      <div className="recipes">
      {recipes.map((recipe, i )=>(
          <Recipe 
          key={i} 
          image={recipe.recipe.image} 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories.toFixed(2)} 
          protein={recipe.recipe.totalNutrients.PROCNT.quantity.toFixed(2)}
          carbohydrates={recipe.recipe.totalNutrients.CHOCDF.quantity.toFixed(2)}
          fat={recipe.recipe.totalNutrients.FAT.quantity.toFixed(2)}
          sugar={recipe.recipe.totalNutrients.SUGAR.quantity.toFixed(2)}
          ingredients={recipe.recipe.ingredients}
          cautions={recipe.recipe.cautions}
          dietLabels={recipe.recipe.dietLabels}
          healthLabels={recipe.recipe.healthLabels}
          link={recipe.recipe.url}/>
        ))}
      </div>
  </div>
  );
}

export default App;
