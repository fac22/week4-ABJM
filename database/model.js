const db = require('./connection.js');

function getUser(email) {
  const SELECT_USER = `
    SELECT id, email, password, name FROM users WHERE email=$1
    `;
  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function createSession(sid, json) {
  const INSERT_SESSION = `
  INSERT INTO sessions (sid, data) VALUES ($1, $2)
  RETURNING sid`;
  return db
    .query(INSERT_SESSION, [sid, json])
    .then((response) => response.rows[0].sid);
}

module.exports = { getUser, createSession };
