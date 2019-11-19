import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './css/App.css';

const App = () =>{

  const APP_ID = "26b09e23";
  const APP_KEY = "ab0fb712cdb2f2d1bfbf7e5cf4670a0d";

  const [recipes, setRecipes] = useState([]);
  const [recipesTest, setRecipesTest] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState("salad");

  useEffect( () => {getRecipes();}, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    let holderArray =[];

    // setRecipes(data.hits);
    // console.log(data.hits);


    data.hits.map((recipe, i )=>{
      let testArray = [recipe.recipe.image,recipe.recipe.label,recipe.recipe.calories,recipe.recipe.totalNutrients.PROCNT.quantity,recipe.recipe.totalNutrients.CHOCDF.quantity,recipe.recipe.totalNutrients.FAT.quantity,recipe.recipe.totalNutrients.SUGAR.quantity,recipe.recipe.ingredients,recipe.cautions,recipe.recipe.dietLabels,recipe.recipe.healthLabels,recipe.recipe.url];
      let testObj = {}

      for (let i = 0; i < testArray.length; i++) {
          
        let testVar = testArray[i];

        if(testVar === undefined){
          testObj[i] = "0";
        }else{
          testObj[i]= testVar;
        }
      }
      holderArray.push(testObj)
    })
    setRecipes(holderArray);
    console.log(holderArray);
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
          image={recipe[0]} 
          title={recipe[1]} 
          calories={recipe[2]} 
          protein={recipe[3]}
          carbohydrates={recipe[4]}
          fat={recipe[5]}
          sugar={recipe[6]}
          ingredients={recipe[7]}
          // cautions={recipe[8]}
          dietLabels={recipe[9]}
          healthLabels={recipe[10]}
          link={recipe[11]}/>
        ))}
      </div>
  </div>
  );
}

export default App;
