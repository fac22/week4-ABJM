const model = require('../database/model.js');

function post(request, response) {
  const sid = request.signedCookies.sid;
  model
    .getSession(sid)
    .then((session) => {
      return session.user.email;
    })
    .then((userEmail) => model.showMyRecipes(userEmail))
    .then((data) => model.deleteRecipe(data[0].title))
    .then(response.redirect('/'));
}

module.exports = { post };
