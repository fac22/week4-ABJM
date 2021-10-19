const model = require('../database/model.js');
const { buildPage } = require('../template.js');

function get(request, response) {
	// get sid

	const title = `Show all Jam`;
	const content = '';

	buildPage(title, content);
}

module.exports = { get };
