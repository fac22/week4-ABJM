const model = require('../database/model.js');
const { buildPage } = require('../template.js');



function get(request, response) {
	const sid = request.signedCookies.sid;
	const title = `B-JAM Home`;


  return model
    .showRecipes()
    .then((data) => {
      return data
        .map(
          (recipe) => /*html*/ `
    <article>
    <ul>
    <li>${recipe.title}</li>
    <li>${recipe.ingredients}</li>
    <li><${recipe.instructions}/li>
    </ul>
    </article>
    `
        )
        .join('');
    })
    .then((recipeList) => {
      if (!sid) {
        return /*html*/ `
        <h1>Welcome to B-Jam Recipes🍓🥕</h1>
        <section>
          <a href="/signUp">Sign up</a>
          <a href="/logIn">Log in</a>
        </section>
        ${recipeList}
      `;
      } else {
        return model
          .getSession(sid)
          .then((session) => console.log(session))
          .then((userEmail) => model.getUser(userEmail))
          .then((user) => {
            return /*html*/ `
            <h2> Happy to see you again🔆</h2>
            <section>
              <a>My profile</a>
              <a>Logout</a>
              <a>Show my recipes</a>
              <a>Go to all recipes</a>
              <a href="/recipeWrite">Write a new recipe</a>

            </section>
            ${recipeList}
            `;
          });
      }
    })
    .then((page) => response.send(buildPage(title, page)));
}

module.exports = { get };
