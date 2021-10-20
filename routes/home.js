const model = require('../database/model.js');
const { buildPage } = require('../template.js');
// const logOutPage = require('logOut.js');

// LINKs

// Version one - if false
// 1. Login
// 2. Signup

//Version two - if true
// 1. My profile
// 2. Logout
// 3. Show my recipes
// 4. Go to all recipes

function get(request, response) {
	const sid = request.signedCookies.sid;
	const title = `B-JAM Home`;

	if (!sid) {
		const content = /*html*/ `
		<h1>Welcome to B-Jam Recipes🍓🥕</h1>
		<div>
		<a href="/signUp">Sign up</a>
		<a href="/logIn">Log in</a>
		</div>
		`;
		response.send(buildPage(title, content));
	} else {
		const content = /*html*/ `
		<h1>Welcome to B-Jam Recipes🍓🥕</h1>
		<div>
		<p><a href="/userProfile">My Profile</a></p>
		<p><a href="/logOut">Log out</a></p>
		<p><a href="/recipesMine">Show my recipes</a></p>
		<p><a href="/recipesAll">Go to all recipes</a></p>
		<p><a href="/recipeWrite">Write a new recipe</a></p>
		</div>
		`;
		response.send(buildPage(title, content));
	}
}

module.exports = { get };
