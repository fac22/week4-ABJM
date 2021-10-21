const model = require('../database/model.js');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model.getRecipes().then((recipes) => {
      const recipeList = recipes
        .map((recipe) => {
          return `<li>${recipe.title}</li>
        <form action="/recipeDelete" method="POST"><button>Delete</button></form>
     `;
        })
        .join('');
      response.send(recipeList);
    });
  } else {
    response.redirect('/');
  }
}

/*function post(request, response) {
  const recipeID = request.body.id;

  const sid = request.signedCookies.sid;

  if (sid) {
    model
      .getSession(sid)
      .then((session) => model.deleteRecipe(recipeID, session.user.id))
      .then(() => response.redirect('/'));
  } else {
    response.redirect('/');
  }
}*/

module.exports = { get, post };
