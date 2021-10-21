const auth = require('../auth.js');
const { buildPage } = require('../template.js');
function get(request, response) {
	//form
	const title = 'B-JAM Sign up';
	const content = /*html*/ `
	<form action="/signUp" method="post">
	<div class="flex">
		<label for="name">Name<span aria-hidden="true">  *</span></label>
		<input type="text" id="name" name="name" aria-describedby="nameRequirements nameError" minlength="2" required=""
		placeholder="Please enter your name">
		</div>
		<p id="nameRequirements" class="requirements centre">
        	Name must be at least 2 characters
        	long.</p>
	<div class="flex">
		<label for="email">Email<span aria-hidden="true">  *</span></label>
		<input type="email" id="email" name="email" placeholder="Enter your email" required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$">
	</div>	
	<div class="flex">
	<label for="password">Password<span aria-hidden="true">  *</span></label>
	<input placeholder="Enter your password" type="password" id="password" name="password"
		aria-describedby="passwordError passwordRequirements" required="" minlength="5">
		</div>
		<p id="passwordRequirements" class="requirements centre">
        Passwords must be at least 5 characters
        long.
      		</p>
	<div class="flex">
		<label for="avatar">Profile Image</label>
		<input type="file" id="avatar" name="avatar">
	</div>
	<div class="centre">
		<button>Sign up</button>
		<a href="/">Go back</a>
	</div>
	</form>
	`;
	response.send(buildPage(title, content));
}

// const MAX_SIZE = 1000 * 1000 * 5; // 5 megabytes
// const ALLOWED_TYPES = ['image/jpeg', 'image/png']; // probs want to support more formats than this

function post(request, response) {
	const { email, password, name, avatar } = request.body;

	const errorTitle = `Error`;
	const errorContent = /*html*/ `<h2>Couldn't sign up, sorry</h2>
  <div class="centre"><a href="/">Go Home</a><a href="/signUp">Go Sign Up</a></div>`;
	const errorPage = buildPage(errorTitle, errorContent);

	// This is server-side validation:
	if (!email || !password || !name) {
		response.send(errorPage);
	}
	//   const file = request.file;
	//   if (!ALLOWED_TYPES.includes(file.mimetype)) {
	//     response
	//       .status(400)
	//       .send('<h1>File upload error</h1><p>Please upload an image file</p>');
	//   }
	//   // file.size tells us how big the file was (in bytes)
	//   if (file.size > MAX_SIZE) {
	//     response
	//       .status(400)
	//       .send('<h1>File upload error</h1><p>Profile picture must be < 5MB</p>');
	//   }
	else {
		auth
			.createUser(name, email, password, avatar)
			.then(auth.saveUserSession)
			.then((sid) => {
				response.cookie('sid', sid, auth.COOKIE_OPTIONS);
				response.redirect('/');
			})
			.catch((error) => {
				console.error(error);
				response.send(errorPage);
			});
	}
}

// From Workshop
function postDog(request, response) {
	const newDog = request.body;
	if (!newDog.name || !newDog.breed) {
		response.redirect('/add-dog/error');
	} else {
		const name = newDog.name.toLowerCase();
		dogs[name] = newDog;
		response.redirect(`/dogs/${newDog.name}`);
	}
}

function errorDog(request, response) {
	const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Error</title>
    </head>
    <body>
      <h1>Submission error</h1>
      <p>Something went wrong with your submission, sorry!</p>
    </body>
  </html>
  `;
	response.end(html);
}

module.exports = { get, post };
