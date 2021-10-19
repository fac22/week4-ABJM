const db = require('./connection.js');

function getUser(email) {
	const SELECT_USER = `SOMEEEETHINNNG`;
	return db.query(SELECT_USER, [email]).then(result => result.rows[0]);
}

function createSession(sid, json) {
	const INSERT_SESSION = `SOMEEETHINNNG`;
	return db
		.query(INSERT_SESSION, [sid, json])
		.then(response => response.rows[0].sid);
}

module.exports = { getUser, createSession };