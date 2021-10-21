const model = require('../database/model.js');
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  // SELECT all FROM recipes where user_id= myID (sid -> getSession -> email -> users -> id)
  const sid = request.signedCookies.sid;
  const title = `My Recipes`;
  model
    .getSession(sid)
    .then((session) => {
      console.log(session);
      return session.user.email;
    })
    .then((userEmail) => model.showMyRecipes(userEmail))
    .then((data) => {
      return data
        .map(
          (recipe) => /*html*/ `
            <article>
            <h3>${recipe.title}</h3>
            <p>Author: ${recipe.name}</p>
            <ul>
              <li>Ingredients
              <ul class="li-style">
              ${recipe.ingredients
                .split(', ')
                .map((x) => `<li>${x}</li>`)
                .join('')}
              </ul>
              </li>
              <li>Instructions 
              <ul class="li-style">
              ${recipe.instructions
                .split('. ')
                .map((x) => `<li>${x}</li>`)
                .join('')}
              </ul>
              </li>
            </ul>
            </article>
            <form action="/recipeDelete" method="POST" class="form-no-style centre">
                <button>Delete my recipe</button>
            </form>
            `
        )
        .join('');
    })
    .then((recipeList) => {
      const page = `<a href="/">Go Home</a> ${recipeList}`;
      response.send(buildPage(title, page));
    })
    .catch((error) => {
      console.error(error);
      response.send(
        buildPage(
          `Error`,
          /*html*/ `<h2>Couldn't show your recipes</h2> <div>
	      <a href="/">Go Back</a>
	  </div>`
        )
      );
    });
}

module.exports = { get };
