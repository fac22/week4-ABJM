const db = require('./connection.js');

function getUser(email) {
  const SELECT_USER = `
    SELECT id, email, password, name FROM users WHERE email=$1
    `;

  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function createUser(name, email, hash) {
  const INSERT_USER = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) 
  RETURNING id, name, email;`;
  return db.query(INSERT_USER, [name, email, hash]).then((result) => {
    console.log('inserted user');
    result.rows[0];
  });
}

function createSession(sid, json) {
  const INSERT_SESSION = `INSERT INTO sessions (sid, data) VALUES ($1, $2)
	RETURNING sid;`;
  return db
    .query(INSERT_SESSION, [sid, json])
    .then((response) => response.rows[0].sid);
}

function deleteSession(sid) {
  const DELETE_SESSION = 'DELETE FROM sessions WHERE sid=$1';
  return db.query(DELETE_SESSION, [sid]);
}

module.exports = { getUser, createUser, createSession, deleteSession };
