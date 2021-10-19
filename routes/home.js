const model = require('../database/model.js');
const { buildPage } = require('../template.js');

function get(request, response) {
  response.send('hello World');
}

module.exports = { get };
