const db = require("./connection.js");

function getUser(email) {
  const SELECT_USER = `SELECT id, email, password, name  FROM users WHERE email=$1;
  `;
  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function createUser(name, email, hash) {
  const INSERT_USER = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) 
  RETURNING id, name, email;`;
  return db.query(INSERT_USER, [name, email, hash]).then((result) => {
    console.log("User created");
    result.rows[0];
  });
}

// function createUser(email, hashedPassword, name) {
// 	console.log('createUser from model.js running');
// 	const INSERT_USER = `INSERT INTO users (email, password, name) VALUES ($1, $2, $3)
// 	RETURNING id, email, name;`;
// 	return database
// 	  .query(INSERT_USER, [email, hashedPassword, name])
// 	  .then((user) => user.rows[0]);
//   }

function createSession(sid, json) {
  const INSERT_SESSION = `INSERT INTO sessions (sid, data) VALUES ($1, $2)
	RETURNING sid;`;
  return db
    .query(INSERT_SESSION, [sid, json])
    .then((response) => response.rows[0].sid);
}

module.exports = { getUser, createSession, createUser };
