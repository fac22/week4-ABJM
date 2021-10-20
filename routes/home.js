const model = require('../database/model.js');
const { buildPage } = require('../template.js');
// const logOutPage = require('logOut.js');

function get(request, response) {
	model.getUser().then(users => {
		response.send(`
      <h1>Create new user</h1>
      <ul>
        ${users
					.map(
						user => `
          <li>
            <h2>${user.name}</h2>
            ${
							user.avatar
							// ? `<img src="/user/${user.id}/avatar" alt="" width="64" height="64">`
							// : ''
						}
          </li>
        `
					)
					.join('')}
     </ul>
    `);
	});
}

module.exports = { get };
