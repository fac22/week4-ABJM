const model = require('../database/model.js');

function post(request, response) {
	const sid = request.signedCookies.sid;
	model
		.getSession(sid)
		.then((session) => {
			return session.user.email;
		})
		.then((userEmail) => model.showMyRecipes(userEmail))
		.then((data) => model.deleteRecipe(data[0].title))
		.then(response.redirect('/'))
		.catch((error) => {
			console.warn(error);
			response.send(`<h2>Sorry</h2>
        <div class="centre"><a href="/">Go Home</a>`);
		});
}

module.exports = { post };
