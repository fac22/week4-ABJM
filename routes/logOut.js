const model = require('../database/model');
const template = require('../template');

// function get()

function post(request, response) {
	// sid
	const sid = request.signedCookies.sid;
	// delete session
	model
		.deleteSession(sid)
		.then(() => {
			// clear cookie
			response.clearCookie('sid');
			console.log('We logged out');
			// redirect home
			response.redirect('/');
		})
		.catch((error) => {
			console.error(error);
			response.send(
				buildPage(
					`Error`,
					`<h2>Sorry, couldn't log out</h2>
          <div><a href="/">Go Back</a></div>`
				)
			);
		});
}

module.exports = { post };
