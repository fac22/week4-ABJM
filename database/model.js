const db = require("./connection.js");

function getUser(email) {
  const SELECT_USER = `
    SELECT id, email, password, name, avatar FROM users WHERE email=$1
    `;

  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function createUser(name, email, hash, avatar) {
  const INSERT_USER = `INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4) 
  RETURNING id, name, email, avatar;`;
  return db.query(INSERT_USER, [name, email, hash, avatar]).then((result) => {
    return result.rows[0];
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
  const DELETE_SESSION = "DELETE FROM sessions WHERE sid=$1";
  return db.query(DELETE_SESSION, [sid]);
}

function getSession(sid) {
  const GET_SESSION = `SELECT data FROM sessions WHERE sid = $1`;
  return db.query(GET_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}

function showRecipes() {
  const query = `SELECT 
  recipes.title, 
  recipes.ingredients, 
  recipes.instructions,
  users.name,
  users.id,
  users.avatar
FROM recipes 
JOIN users 
ON recipes.user_id = users.id`;
  return db.query(query).then((result) => result.rows);
}

function showMyRecipes(email) {
  const query = `
  SELECT 
    recipes.title, 
    recipes.ingredients, 
    recipes.instructions,
    users.name
  FROM recipes 
  JOIN users 
  ON recipes.user_id = users.id
  WHERE email = $1
  `;
  return db.query(query, [email]).then((result) => result.rows);
}

function getAvatar(id) {
  return db
    .query("SELECT avatar FROM users WHERE id=$1", [id])
    .then((result) => result.rows[0]);
}

module.exports = {
  getUser,
  createUser,
  createSession,
  deleteSession,
  getSession,
  showRecipes,
  showMyRecipes,
  getAvatar,
};
