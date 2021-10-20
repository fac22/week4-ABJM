const model = require("../database/model.js");
const { buildPage } = require("../template.js");
// const logOutPage = require('logOut.js');

function get(req, res) {
  model.getUsers().then((users) => {
    console.log(users);
    res.send(
      buildPage(
        "Home",
        `
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
		`
      )
    );
  });
}

module.exports = { get };
