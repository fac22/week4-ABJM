const model = require('../database/model.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  const title = 'My details';
  // Who is logged in right now?
  const sid = request.signedCookies.sid;
  model
    .getSession(sid)
    .then((session) => {
      const content =
        /*html */
        `<form action="userEdit" method="POST">
        <h3>Update my details</h3>
      <label for="name">Name <span aria-hidden="true">*</span></label>
      <input type="text" id="name" name="name" value="${session.user.name}" required />
      <label for="email">Email <span aria-hidden="true">*</span></label>
      <input type="text" id="email" name="email" value="${session.user.email}" required />
    <button>Save Changes</button>
    </form>
    <form action="userDelete" method="POST">
    <button>Delete my account</button>
    </form>

    <form action="/logOut" method="POST">
    <button id="logoutBtn">Log out</button>
    <a href="/recipesMine">Show my recipes</a>
    <a href="/recipeWrite">Write a new recipe</a>
    `;
      response.send(buildPage(title, content));
    })
    .catch(() => response.send('error!'));
}

function post(request, response) {
  // Who is logged in?
  const sid = request.signedCookies.sid;

  // look up email from current sid-data
  return (
    model
      .getSession(sid)
      .then((session) => session.user.email)
      // Update users row for this email
      .then((sessionEmail) => model.updateUser(sessionEmail, name))
      .then(() => response.send('successfully updated'))
  );
}

module.exports = { get, post };
