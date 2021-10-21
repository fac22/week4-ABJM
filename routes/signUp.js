const auth = require("../auth.js");

const { buildPage } = require("../template.js");

function get(request, response) {
  //form

  response.send(
    buildPage(
      "B-JAM Sign up",
      /*html*/ `
	
	<!--<form action="/signUp" enctype="multipart/form-data" method="post">-->
	<form action="/signUp" enctype="multipart/form-data" method="post">
	<div>
		<label for="name">Name<span aria-hidden="true">*</span></label>
		<p id="nameRequirements" class="requirements">
        	Name must be at least 2 characters
        	long.</p>
		<input type="text" id="name" name="name" aria-describedby="nameRequirements nameError" minlength="2" required=""
        	placeholder="Please enter your name">
	</div>
	<div>
		<label for="email">Email<span aria-hidden="true">*</span></label>
		<input type="email" id="email" name="email" placeholder="Enter your email" required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$">
	</div>	
	<div>
		<label for="password">Password<span aria-hidden="true">*</span></label>
		<p id="passwordRequirements" class="requirements">
        Passwords must be at least 5 characters
        long.
      		</p>
		<input placeholder="Enter your password" type="password" id="password" name="password"
			aria-describedby="passwordError passwordRequirements" required="" minlength="5">
	</div>
	<div>
		<label for="avatar">Profile Image</label>
		<input type="file" id="avatar" name="avatar">
	</div>
		<button>Sign up</button>
	</form>
	`
    )
  );
}
const express = require("express");
const multer = require("multer");
const server = express();
const upload = multer();
const MAX_SIZE = 1000 * 1000 * 5; // 5 megabytes
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

server.post("/signUp", upload.single("avatar"), (request, response) => {
  const file = request.file;
  console.log(file.buffer);
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    response
      .status(400)
      .send("<h1>File upload error</h1><p>Please upload an image file</p>");
  }
  if (file.size > MAX_SIZE) {
    response
      .status(400)
      .send("<h1>File upload error</h1><p>Profile picture must be < 5MB</p>");
  } else {
    const { email, password, name } = request.body;
    auth
      .createUser(name, email, password, file.buffer)
      .then(auth.saveUserSession)
      .then((sid) => {
        response.cookie("sid", sid, auth.COOKIE_OPTIONS);
        response.redirect("/");
      })
      .catch((error) => {
        console.error(error);
        response.send(buildPage(`Error`, `<h2>Couldn't sign up, sorry</h2>`));
      });
  }
});

module.exports = { get };
