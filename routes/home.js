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
    <div>
    <h3>${recipe.title}</h3>
    <p>Author: ${recipe.name}</p>
    </div>
    <ul>
    <li><p>Ingredients<p> ${recipe.ingredients}</li>
    <li><p>Instructions<p> ${recipe.instructions}</li>
    </ul>
    </article>
    `
        )
        .join('');
    })
    .then((recipeList) => {
      if (!sid) {
        return /*html*/ `
        <section>
        <h1>Welcome to B-Jam Recipes🍓🥕</h1>
     
          <p class="gap"><a href="/signUp">Sign up</a>
          <a href="/logIn">Log in</a></p>
   
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
            <!--<a href="/logOut">Logout</a>-->
              <form action="/logOut" method="POST">
                <button id="logoutBtn">Log out</button>
                <a href="/userProfile">My profile</a>
                <a href="/recipesMine">Show my recipes</a>
                <!--<a href="/recipesAll">Go to all recipes</a>-->
                <a href="/recipeWrite">Write a new recipe</a>
              </form>

            </section>
            ${recipeList}
            `;
          });
      }
    })
    .then((page) => response.send(buildPage(title, page)));
}

module.exports = { get };
