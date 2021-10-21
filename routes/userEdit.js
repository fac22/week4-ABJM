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
        `<form action="userEdit" method="POST" class="flex flex-column centre">
        <h3>Update my details</h3>
      <label for="name">Name <span aria-hidden="true">*</span></label>
      <input type="text" id="name" name="name" value="${session.user.name}" required />
      <label for="email">Email <span aria-hidden="true">*</span></label>
      <input type="text" id="email" name="email" value="${session.user.email}" required />
    <button class="margin-centre">Save Changes</button>
    </form>
		<section class ="manage-account">
    <form action="/logOut" method="POST" class="form-no-style">
    <a href="/recipesMine">Show my recipes</a>
    <a href="/recipeWrite">Write a new recipe</a>
    <button id="logoutBtn">Log out</button>
		</form>
    <form action="userDelete" method="POST" class="form-no-style">
    <button>Delete my account</button>
    </form>
		</section>
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
      .catch((error) => {
        console.warn(error);
        response.send(`<h2>Sorry</h2>
          <div class="centre"><a href="/">Go Home</a>`);
      })
  );
}

module.exports = { get, post };
