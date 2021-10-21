const auth = require("../auth.js");
const multer = require("multer");
const model = require("../database/model.js");

// const upload = multer();

const { buildPage } = require("../template.js");


function get(req, res) {
  model.getUsers().then((users) => {
    console.log(users);
    res.send(`
		  <h1>Create new user</h1>
		  <form enctype="multipart/form-data" method="post">
			<p>
			  <label for="email">Email</label>
			  <input type="email" id="email" name="email">
			</p>
			<p>
			  <label for="name">Name</label>
			  <input type="name" id="name" name="name">
			</p>
			<div>
				<label for="password">Password<span aria-hidden="true">*</span></label>
				<p id="passwordRequirements" class="requirements">
        		Passwords must be at least 5 characters
        		long.
      			</p>
				<input placeholder="Enter your password" type="password" id="password" name="password"
				aria-describedby="passwordError passwordRequirements" required="" minlength="5">
			</div>
			<p>
			  <label for="avatar">Profile picture</label>
			  <input type="file" id="avatar" name="avatar">
			</p>
			<p><button>Sign up</button></p>
		  </form>
		  <ul>
			${users
        .map(
          (user) => `
			  <li>
				<h2>${user.name}</h2>
				${
          user.avatar
            ? `<img src="/user/${user.id}/avatar" alt="" width="64" height="64">`
            : ""
        }
			  </li>
			`
        )
        .join("")}
		 </ul>
		`);
  });

}

function post(request, response) {
  const { email, password, name, avatar } = request.body;
  auth
    .createUser(name, email, password, avatar)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie('sid', sid, auth.COOKIE_OPTIONS);
      response.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      response.send(buildPage(`Error`, `<h2>Couldn't sign up, sorry</h2>`));
    });
}

module.exports = { get, post };
