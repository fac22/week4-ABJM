const model = require('../database/model.js');
const { buildPage } = require('../template.js');

//put in model.js
const db = require('../database/connection');
// SELECT all FROM recipes JOIN USERS on id
function getRecipesAll() {
  const ALL_RECIPES = `
		SELECT 
			recipes.title, 
			recipes.ingredients, 
			recipes.instructions,
			users.name
		FROM recipes 
		JOIN users 
		ON recipes.user_id = users.id
	`;
  return db.query(ALL_RECIPES).then((result) => result.rows);
}

function get(request, response) {
  // get sid

  const title = `Show all Jam`;
  getRecipesAll()
    .then((recipes) => {
      return recipes
        .map((recipe) => {
          return /*html*/ `
						<article>
							<h3>${recipe.title}</h3>
							<p>Author: ${recipe.name}</p>
							<h4>Ingredients:</h4>
							<ul><li>${recipe.ingredients}</li></ul>
							<h4>Steps:</h4>
							<p>${recipe.instructions}</p>
							<form action="recipeDelete" method="POST">
							<button>Delete recipe</button>
							</form>
						</article>
					`;
        })
        .join('');
    })
    .then((articles) => {
      response.send(buildPage(title, articles));
    });
}

module.exports = { get };
