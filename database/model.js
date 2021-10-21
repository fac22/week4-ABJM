const db = require('./connection.js');

function getUser(email) {
  const SELECT_USER = `
    SELECT id, email, password, name, avatar FROM users WHERE email=$1
    `;

  return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

function createUser(name, email, hash, avatar) {
  const INSERT_USER = `INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4) 
  RETURNING id, name, email;`;
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
  const DELETE_SESSION = 'DELETE FROM sessions WHERE sid=$1';
  return db.query(DELETE_SESSION, [sid]);
}

function getSession(sid) {
  const GET_SESSION = `SELECT data FROM sessions WHERE sid = $1`;
  return db.query(GET_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}

function getRecipes() {
  const GET_RECIPES = `
  SELECT * FROM recipes 
  `;
  console.log('deleting recipe');
  return db.query(GET_RECIPES).then((result) => result.rows);
}

function showRecipes() {
  const query = `SELECT 
  recipes.title, 
  recipes.ingredients, 
  recipes.instructions,
  users.name
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

function updateUser(sessionEmail, name) {
  const UPDATER = `UPDATE users SET name = $1 WHERE users.email = $2;`;
  return db
    .query(UPDATER, [name, sessionEmail])
    .then((result) => result.rows[0]);
}

function deleteRecipe(recipeID, user_id) {
  const DELETE_RECIPE = `DELETE FROM recipes WHERE id=$1 AND user_id=$2`;
  return db.query(DELETE_RECIPE, [parseInt(recipeID, 10), user_id]);
}

/*function updateRecipe(sessionRecipe, name) {
  const UPDATER = `UPDATE recipes SET name = $1 WHERE recipes.email = $2;`;
  return db
    .query(UPDATER, [name, sessionRecipe])
    .then((result) => result.rows[0]);
}*/

function deleteUser(email) {
  const DELETE_USER = `DELETE from users WHERE email = $1;`;
  return db.query(DELETE_USER, [email]);
}

module.exports = {
  getUser,
  createUser,
  createSession,
  deleteSession,
  getSession,
  showRecipes,
  showMyRecipes,
  updateUser,
  deleteUser,
  deleteRecipe,
  getRecipes,
};
