const model = require('../database/model.js');
const { buildPage } = require('../template.js');
const { userDelete } = require('./userDelete.js');

function get(request, response) {
  const title = 'Edit Profile';
  // Who is logged in right now?
  const sid = request.signedCookies.sid;
  model
    .getSession(sid)
    .then((session) => {
      const content =
        /*html */
        `<form action="userEdit" method="POST">
      <label for="name">Name <span aria-hidden="true">*</span></label>
      <input type="text" id="name" name="name" value="${session.user.name}" required />
    
    <button>Save Changes</button>
    </form>
    <form action="userDelete" method="POST">
    <button>Delete my account</button>
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
      .then((session) => session.user.email)
      // Update users row for this email
      .then((sessionEmail) => model.updateUser(sessionEmail, name))
      .then(() => response.send('successfully updated'))
  );
}

module.exports = { get, post };
