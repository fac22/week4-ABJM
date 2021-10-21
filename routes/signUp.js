const auth = require("../auth.js");

const { buildPage } = require("../template.js");

function get(request, response) {
  //form

  response.send(
    buildPage(
      "B-JAM Sign up",
      /*html*/ `
	
	<!--<form action="/signUp" enctype="multipart/form-data" method="post">-->
	<form action = "/signUp" enctype="multipart/form-data" method="post">
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

module.exports = { get };
