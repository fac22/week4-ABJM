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
			console.warn(error);
			response.send(`<h2>Sorry, couldn't log out</h2>
        <div class="centre"><a href="/">Go Home</a>`);
		});
}

module.exports = { post };
