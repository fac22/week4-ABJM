const model = require('../database/model');
const template = require('../template');

// function get()

function post(request, response) {
	// sid
	const sid = request.signedCookies.sid;
	// delete session
	model.deleteSession(sid).then(() => {
		// clear cookie
		response.clearCookie('sid');
		console.log('We logged out');
		// redirect home
		response.redirect('/');
	});
}

module.exports = { post };
