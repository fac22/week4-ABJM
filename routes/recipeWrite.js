const model = require('../database/model.js');
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  const title = 'Write a Recipe';

  const form = /*html*/ `
	<h1>Write a new Recipe</h1>
	<form action="/recipeWrite" method="POST">
	
	<!--Title-->
	<div class="flex flex-column">
	<label for="title">Title<span aria-hidden="true">*</span></label>
	<input
	type="text"
	id="title"
	name="title"
	placeholder="Enter the recipe title"
	required
	/>
	<p id="titleRequirements" class="requirements">Please add your title.</p>
	</div>
	
	<!--Ingredients-->
	<div class="flex flex-column">
	<label for="ingredients">Ingredients<span aria-hidden="true">*</span></label>
	<textarea
	id="ingredients"
	name="ingredients"
	placeholder="Onions, carrots, ... (max. length 1000 characters)"
	maxlength="1000"
	rows="4" cols="30"
	required
	></textarea>
	<p id="ingredientsRequirements" class="requirements ">
	Please add your ingredients.
	</p>
	</div>
	<!--Instructions-->
	<div class="flex flex-column">
	<label for="instructions">Instructions<span aria-hidden="true">*</span></label>
	<textarea
	id="instructions"
	name="instructions"
	placeholder="Dice your onions. Peel your carrots. (max.   length 2000 characters)"
	maxlength="2000"
	rows="4" cols="30"
	required
	></textarea>
	<p id="instructionsRequirements" class="requirements ">
	Please add your instructions.
	</p>
	</div>
	<div class="margin-centre centre">
	<button >Save Recipe</button>
	</div>
	
	</form>
<a href="/">Go Home</a>
  `;

  response.send(buildPage(title, form));
}

//model.js
const db = require('../database/connection');
function getSession(sid) {
  const SELECT_SESSION = `SELECT data FROM sessions WHERE sid=$1`;
  return db.query(SELECT_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}
function saveRecipe(title, ingredients, instructions, author) {
  const ADD_RECIPE = `INSERT INTO recipes (title, ingredients, instructions, user_id) VALUES($1, $2, $3, $4)`;
  return db.query(ADD_RECIPE, [title, ingredients, instructions, author]);
}

function post(request, response) {
  // Get title, ingredients, instructions
  const { title, ingredients, instructions } = request.body;
  console.log(title);
  // connect user_id:
  // --> find cookie-sid

  const errorTitle = `Error`;
  const errorContent = /*html*/ `<h2>Couldn't add your recipe, sorry</h2>
  <div class="centre"><a href="/">Go Home</a><a href="/recipeWrite">Try again</a></div>`;
  const errorPage = buildPage(errorTitle, errorContent);

  // This is server-side validation:
  if (!title || !ingredients || !instructions) {
    response.send(errorPage);
  } else {
    const sid = request.signedCookies.sid;
    console.log(sid);
    // --> sessions(data) --> email
    model
      .getSession(sid)
      .then((session) => {
        console.log(session);
        return session.user.email;
      })
      // --> users(email) --> id
      .then((authorEmail) => model.getUser(authorEmail))
      // save title, ingredients, instructions, user_id in recipes
      .then((dbUser) => {
        saveRecipe(title, ingredients, instructions, dbUser.id);
        // redirect where?
        response.redirect('/');
      })
      // catch errors
      .catch((error) => {
        console.error(error);
        response.send(errorPage);
      });
  }
}

module.exports = { get, post };
