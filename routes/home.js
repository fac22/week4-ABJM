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
    <h2>${recipe.title}</h2>
    <p class="author">Author: ${recipe.name}</p>
    </div>
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
            <section class="home-links">
            <!--<a href="/logOut">Logout</a>-->
              <form action="/logOut" method="POST">
                <button id="logoutBtn">Log out</button>
                <a href="/userEdit">My profile</a>
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
		.then((page) => response.send(buildPage(title, page)))
		.catch((error) => {
			console.warn(error);
			response.send(
				buildPage(
					`Error`,
					`<h2> Couldn't load homepage, sorry</h2>
        <div class="centre"><a href="/">Go Home</a>`
				)
			);
		});
}

module.exports = { get };
