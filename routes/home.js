const model = require("../database/model.js");
const { buildPage } = require("../template.js");
const express = require("express");
const server = express();
const multer = require("multer");
const auth = require("../auth.js");

function get(request, response) {
  const sid = request.signedCookies.sid;
  const title = `B-JAM Home`;

  return model
    .showRecipes()
    .then((data) => {
      console.log(data);
      return data
        .map(
          (recipe) => /*html*/ `
    <article>
    <h3>${recipe.title}</h3>
    <p>Author: ${recipe.name}</p>
	<p>Avatar: ${
    recipe.avatar
      ? `<img src="/recipe/${recipe.id}/avatar" alt="" width="64" height="64">`
      : ""
  }</p>
    <ul>
    <li>Ingredients: ${recipe.ingredients}</li>
    <li>Instructions: ${recipe.instructions}</li>
    </ul>
    </article>
    `
        )
        .join("");
    })
    .then((recipeList) => {
      if (!sid) {
        return /*html*/ `
        <h1>Welcome to B-Jam Recipes🍓🥕</h1>
        <section>
          <a href="/signUp">Sign up</a>
          <a href="/logIn">Log in</a>
        </section>
        ${recipeList}
      `;
      } else {
        return model
          .getSession(sid)
          .then((session) => console.log(session))
          .then((userEmail) => model.getUser(userEmail))
          .then((user) => {
            console.log(user);
            return /*html*/ `
            <h2> Happy to see you again 🔆</h2>
            <section>
            <!--<a href="/logOut">Logout</a>-->
              <form action="/logOut" method="POST">
                <button id="logoutBtn">Log out</button>
              </form>
              <a href="/userProfile">My profile</a>
              <a href="/recipesMine">Show my recipes</a>
              <!--<a href="/recipesAll">Go to all recipes</a>-->
              <a href="/recipeWrite">Write a new recipe</a>

            </section>
            ${recipeList}
            `;
          });
      }
    })
    .then((page) => response.send(buildPage(title, page)));
}

server.get("/recipe/:id/avatar", (req, res) => {
  model.getAvatar(req.params.id).then((user) => {
    res.send(user.avatar);
  });
});

module.exports = { get };
