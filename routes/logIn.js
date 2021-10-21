// Imports
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
	// Login form
	const title = 'Log in';
	const form = /*html*/ `
		<h1>Log in</h1>
		<form action="/logIn" method="POST">
        <div class="flex">
		<label for="email">Email<span aria-hidden="true">*</span></label>
		<input type="email" id="email" name="email" placeholder="Enter your email" required>
	    </div>
		<div class="flex">
		<label for="password">Password<span aria-hidden="true">*</span></label>
		<input placeholder="Enter your password" type="password" id="password" name="password" required>
	    </div>
      <div class="centre">
			<button>Log in</button>
      <a href="/">Go back</a>
      </div>
		</form>
		`;
	response.send(buildPage(title, form));
}

function post(request, response) {
	// const {email, password} = request.body;
	const { email, password } = request.body;

	const errorTitle = `Error`;
	const errorContent = /*html*/ `<h2>Couldn't log in, sorry</h2>
  <div class="centre"><a href="/">Go Home</a><a href="/logIn">Go Log In</a></div>`;
	const errorPage = buildPage(errorTitle, errorContent);

	// This is server-side validation:
	if (!email || !password) {
		response.send(errorPage);
	} else {
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
				response.send(errorPage);
			});
	}
}

module.exports = { get, post };
