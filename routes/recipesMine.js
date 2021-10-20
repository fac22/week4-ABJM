const model = require('../database/model.js');
const auth = require('../auth.js');
const { buildPage } = require('../template.js');

function get(request, response) {
	// SELECT all FROM recipes where user_id= myID (sid -> getSession -> email -> users -> id)
}

module.exports = { get };
