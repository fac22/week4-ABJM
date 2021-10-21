const model = require('../database/model.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  const title = 'Edit Recipe';
  // Who is logged in right now?
  const sid = request.signedCookies.sid;
  model
    .getSession(sid)
    .then((session) => {
      const content =
        /*html */
        `<form action="recipeEdit" method="POST">
      <label for="name">Name <span aria-hidden="true">*</span></label>
      <input type="text" id="name" name="name" value="${session}" required />
    
    <button>Save Changes</button>
    </form>
    <form action="recipeDelete" method="POST">
    <button>Delete my recipe</button>
    `;
      response.send(buildPage(title, content));
    })
    .catch(() => response.send('error!'));
}

function post(request, response) {
  const { name, email } = request.body;

  // Who is logged in?
  const sid = request.signedCookies.sid;

  // look up email from current sid-data
  return (
    model
      .getSession(sid)
      .then((session) => session.recipe.email)
      // Update users row for this email
      .then((sessionRecipe) => model.updateRecipe(sessionRecipe, name))
      .then(() => response.send('successfully updated'))
  );
}

module.exports = { get, post };
