const db = require("./connection.js");

function getUser(email) {
  const SELECT_USER = `SOMEEEETHINNNG`;
  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function createUser(name, email, hash, avatar) {
  const INSERT_USER = `INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4)`;
  return db
    .query(INSERT_USER, [name, email, hash, avatar])
    .then((result) => result.rows[0]);
}

function createSession(sid, json) {
  const INSERT_SESSION = `SOMEEETHINNNG`;
  return db
    .query(INSERT_SESSION, [sid, json])
    .then((response) => response.rows[0].sid);
}

module.exports = { getUser, createSession, createUser };
