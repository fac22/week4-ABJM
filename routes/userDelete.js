const model = require('../database/model.js');

function post(request, response) {
	const sid = request.signedCookies.sid;
	model
		.getSession(sid)
		.then((session) => model.deleteUser(session.user.email))
		.then(() => model.deleteSession(sid))
		.then(() => {
			response.clearCookie('sid');
			response.redirect('/');
		})
		.catch((error) => {
			console.warn(error);
			response.send(`<h2>Sorry</h2>
        <div class="centre"><a href="/">Go Home</a>`);
		});
}

module.exports = { post };
