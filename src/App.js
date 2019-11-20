import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './css/App.css';

const App = () =>{

  const APP_ID = "26b09e23";
  const APP_KEY = "ab0fb712cdb2f2d1bfbf7e5cf4670a0d";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState("");
  const holderArray = [];
  const ref = React.createRef();

  useEffect( () => {getRecipes();}, [query]);
  useEffect( () => {autoScroll();}, [recipes]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    const data2 = data.hits;

    // setRecipes(data.hits);
    // console.log(data.hits);

    //Accessing deeply nested values: https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a 
    const get = p => o =>
      p.reduce((xs, x) =>
        (xs && xs[x]) ? xs[x] : 0, o)
    
    data2.forEach((item, index) =>{ 
      const object = {};

      const image = get(['recipe', 'image']);
      object.image = image(item);
      const label = get(['recipe', 'label']);
      object.label = label(item);
      const ingredients = get(['recipe', 'ingredients']);
      object.ingredients = ingredients(item);
      const calories = get(['recipe', 'calories']);
      object.calories = calories(item);
      const protein = get(['recipe','totalNutrients','PROCNT','quantity']);
      object.protein = protein(item);
      const carbohydrates = get(['recipe','totalNutrients','CHOCDF','quantity']);
      object.carbohydrates = carbohydrates(item);
      const fat = get(['recipe','totalNutrients','FAT','quantity']);
      object.fat = fat(item);
      const sugar = get(['recipe','totalNutrients','SUGAR','quantity']);
      object.sugar = sugar(item);
      const cautions = get(['recipe', 'cautions']);
      object.cautions = cautions(item);
      const dietLabels = get(['recipe', 'dietLabels']);
      object.dietLabels = dietLabels(item)
      const healthLabels = get(['recipe', 'healthLabels']);
      object.healthLabels = healthLabels(item);
      const url = get(['recipe', 'url']);
      object.url = url(item);

      holderArray.push(object);
    }); 

    setRecipes(holderArray);
  }

  const updateSearch = e => { //event
    setSearch(e.target.value)
  }

  const autoScroll = () =>{
    ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  
return(
  <div className="App">
  <ul className="cb-slideshow">
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
        <li>
          <span></span>
        </li>
      </ul>
    <div className="intro">
      <div className="introInner">
        <h1 className="title">Ten Meals</h1>
        <h3 className="subtitle">Enter any ingredient of your choice and receieve 10 top dish suggestions.</h3>
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit">SEARCH</button>
        </form>
      </div>
    </div>
      <div ref={ref} className="recipes">
      {recipes.map((recipe, i )=>(
          <Recipe 
          key={i} 
          image={recipe.image} 
          label={recipe.label} 
          calories={recipe.calories.toFixed(2)} 
          protein={recipe.protein.toFixed(2)}
          carbohydrates={recipe.carbohydrates.toFixed(2)}
          fat={recipe.fat.toFixed(2)}
          sugar={recipe.sugar.toFixed(2)}
          ingredients={recipe.ingredients}
          cautions={recipe.cautions}
          dietLabels={recipe.dietLabels}
          healthLabels={recipe.healthLabels}
          url={recipe.url}/>
        ))}
      </div>
  </div>
  );
}

export default App;
