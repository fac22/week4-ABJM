const model = require('../database/model.js');
const { buildPage } = require('../template.js');
// const logOutPage = require('logOut.js');

function get(request, response) {
	response.send(`<h1>hello World</h1><form action="/logOut" method="POST">
	<button id="logoutBtn">Log out</button>
</form> `);
}

module.exports = { get };
