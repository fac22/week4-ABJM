const model = require('../database/model');
const template = require('../template');

function post(request, response) {
	// sid
	const sid = request.signedCookies.sid;
	// delete session
	model.deleteSession(sid).then(() => {
		// clear cookie
		response.clearCookie('sid');
		// redirect home
		response.redirect('/');
	});
}

module.exports = { post };
