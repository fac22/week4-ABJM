const model = require("../database/model.js");
const { buildPage } = require("../template.js");
// const logOutPage = require('logOut.js');

function get(request, response) {
  // const sid = request.signedCookies.sid;
  // model
  //   .getSession(sid)
  //   .then((session) => session.user.email)
  //   .then((userEmail) => model.getUser(userEmail))
  //   .then((user) => {
  //     response.send(`
  //         <img src="/user/${user.id}/avatar" alt="" width="64" height="64">
  // `);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     response.send(`Sorry`);
  //   });
  response.send(buildPage("Home", "Hello"));
}

module.exports = { get };
