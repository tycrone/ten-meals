import React from 'react';
import style from './css/recipe.module.css';

const Recipe = ({title,calories,protein,carbohydrates,fat,sugar,image,ingredients,cautions,dietLabels,healthLabels,link}) => {
	return(
		<div className={style.recipe}>
			<div className={style.recipeInner1}>
				<h1>{title}</h1>
				<img className={style.recipeImage} src={image} alt=""/>
			</div>
			<div className={style.recipeInner2}>
				<p className={style.innerlabel}>Ingredients</p>
				<ol>
					{ingredients.map((ingredient, i) =>(
						<li key={i}>{ingredient.text}</li>
					))}
				</ol>
				<a target="_blank" rel="noopener noreferrer" href={link}><div className={style.button}>LEARN MORE</div></a>
			</div>
			<div className={style.recipeInner3}>
				<p className={style.innerlabel}>Details</p>
				<p className={style.nutritionalp}>Calories: {calories}</p>
				<p className={style.nutritionalp}>Protein: {protein}g</p>
				<p className={style.nutritionalp}>Carbohydrates: {carbohydrates}g</p>
				<p className={style.nutritionalp}>Fat: {fat}g</p>
				<p className={style.nutritionalp}>Sugar: {sugar}g</p>
				<br/>
				<p className={style.redText}> {cautions.map((caution, i) =>(
					<li key={i}>{caution}</li>
					))}</p>
				<p className={style.greenText}>{dietLabels.map((dietLabels, i) =>(
					<li key={i}>{dietLabels}</li>
					))}
					{healthLabels.map((healthLabels, i) =>(
					<li key={i}>{healthLabels}</li>
					))}</p>
				
			</div>
		</div>
	);
}

export default Recipe;