// Imports
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  // Login form
  const title = 'Log in';
  const form = /*html*/ `
		<h1>Log in</h1>
		<form action="/log-in" method="POST">
        <div>
		<label for="email">Email<span aria-hidden="true">*</span></label>
		<input type="email" id="email" name="email" placeholder="Enter your email" required>
	    </div>
		<div>
		<label for="password">Password<span aria-hidden="true">*</span></label>
		<input placeholder="Enter your password" type="password" id="password" name="password" required>
	    </div>
			<button>Log in</button>
		</form>
		`;
  response.send(buildPage(title, form));
}

function post(request, response) {
  // const {email, password} = request.body;
  const { email, password } = request.body;
  //match passwords
  //make new session with sid
  auth
    // match passwords
    .verifyUser(email, password)
    // make new session with session id
    .then(auth.saveUserSession)
    // make a cookie
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      response.redirect('/');
    })
    // catch
    .catch((error) => {
      console.error(error);
      response.send(
        buildPage(
          `Error`,
          /*html*/ `<h2>User not found</h2> <div>
          <a href="/">Go Back</a>
      </div>`
        )
      );
    });
}

module.exports = { get, post };
