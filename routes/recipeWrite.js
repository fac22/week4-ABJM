const model = require('../database/model.js');
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  const title = 'Write a Recipe';

  const form = /*html*/ `
    <h1>Write a new Recipe</h1>
    <form action="/recipeWrite" method="POST">

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
        ></textarea>
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
        ></textarea>
      </div>
      <button>Save Recipe</button>

    </form>
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
  // console.log(title);
  // connect user_id:
  // --> find cookie-sid
  const sid = request.signedCookies.sid;
  // console.log(sid);
  // --> sessions(data) --> email
  getSession(sid)
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
      response.send(
        buildPage(
          `Error`,
          /*html*/ `<h2>Couldn't submit recipe</h2> <div>
	      <a href="/">Go Back</a>
	  </div>`
        )
      );
    });
}

module.exports = { get, post };
