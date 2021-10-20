const model = require('../database/model.js');
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
	const title = 'Write a Recipe';

	const form = /*html*/ `
    <h1>Write a new Recipe</h1>
    <form action="/logOut" method="POST">

    <!--Title-->
      <div>
        <label for="title">Title<span aria-hidden="true">*</span></label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter the recipe title"
          required
        />
      </div>

      <!--Ingredients-->
      <div>
        <label for="ingredients">Ingredients<span aria-hidden="true">*</span></label>
        <textarea
          id="ingredients"
          name="ingredients"
          placeholder="Onions, carrots, ... (max. length 1000 characters)"
          maxlength="1000"
          required
        >
      </div>
      <!--Instructions-->
      <div>
        <label for="instructions">Instructions<span aria-hidden="true">*</span></label>
        <textarea
          id="instructions"
          name="instructions"
          placeholder="Dice your onions. Peel your carrots. (max.   length 2000 characters)"
          maxlength="2000"
          required
        >
      </div>
      <button>Save Recipe</button>

    </form>
  `;

	response.send(buildPage(title, form));
}

//model.js
const db = require('../database/connection');
function getSession(sid) {}
function saveRecipe(title, ingredients, instructions, author) {}

function post(request, response) {
	// Get title, ingredients, instructions
	const { title, ingredients, instructions } = request.body;

	// connect user_id:
	// --> find cookie-sid
	const sid = request.signedCookies.sid;

	// --> sessions(data) --> email
	getSession(sid)
		.then(data => data.email)
		// --> users(email) --> id
		.then(authorEmail => model.getUser(authorEmail))
		// save title, ingredients, instructions, user_id in recipes
		.then(dbUser => {
			saveRecipe(title, ingredients, instructions, dbUser.id);
			response.redirect('/');
		})
		.catch(error => {
			console.error(error);
			response.send(
				buildPage(
					`Error`,
					/*html*/ `<h2>Couldn't submit recipe</h2> <div>
          <a href="/">Go Back</a>
      </div>`
				)
			);
		});

	// redirect where?

	// catch errors?
}

module.exports = { get, post };
