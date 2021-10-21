const model = require('../database/model');
const auth = require('../auth');
// const { STATUS_CODES } = require('http');

// Suggested:
function getUser1(req, res, next) {
	const sid = req.signedCookies.sid;
	const sessionInfo = getSession(sid);
	if (sessionInfo) {
		req.session = sessionInfo;
	}
	next();
}

function getEmail(request, response, next) {
	const sid = request.signedCookies.sid;
	let sessionInfo;
	model.getSession(sid).then((r) => (sessionInfo = r.user));
	if (sessionInfo) {
		request.ses = sessionInfo;
		// request.use = sessionInfo.user;
		console.log(request.ses);
		// console.log(request.use);
	}
	next();
}

function checkAuth(req, res, next) {
	const user = req.session;
	if (!user) {
		res.status(401).send(`
      <h1>Please log in to view this page</h1>
      <a href="/log-in">Log in</a>
    `);
	} else {
		next();
	}
}

function logger(req, res, next) {
	const time = new Date().toLocaleTimeString();
	console.log(`${time} ${req.method} ${req.url}`);
	next();
}

const { STATUS_CODES } = require('http');

function handleErrors(error, req, res, next) {
	console.error(error);
	const status = error.status || 500;
	res.status(status);

	const isProd = process.env.NODE_ENV === 'production';
	if (isProd) {
		const message = STATUS_CODES[status];
		res.send(message);
	} else {
		res.send(`<pre>${error.stack}</pre>`);
	}
}

//server.js
// server.use(logger);
// server.use(getUser);
// server.get('/', (req, res) => {
// 	const user = req.session;

// 	//login
// 	const newUser = req.body;
// });

module.exports = { getEmail };
