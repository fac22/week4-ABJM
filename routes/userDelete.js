const model = require('../database/model');

function post(request, response) {
  const sid = request.signedCookies.sid;
  model
    .getSession(sid)
    .then((session) => model.deleteUser(session.user.name))
    .then(() => model.deleteSession(sid))
    .then(() => {
      response.clearCookie('sid');
      response.redirect('/');
    });
}

module.exports = { post };
