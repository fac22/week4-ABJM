beforeEach(() => {
	cy.task('resetDb');
});

// Practice Test
// describe('Testing Works', () => {
// 	it('Passes when visiting google', () => {
// 		cy.visit('www.google.com');
// 	});
// });

/*
Routes:
Done:
- home unknown: login/sign-up button, all recipes
- signUp
- logout
- logIn
- home known: login/sign-up button, all recipes
- recipeWrite
- recipesMine

Still to do:
- recipeEdit
- recipeDelete
- userProfile
- userEdit
- userDelete
*/

// Routes:
// home newbie: login/sign-up button, all recipes
describe('Homepage for newbies', () => {
	it('Displays Sign up and Log in', () => {
		cy.visit('/');
		//has <a href="">
		cy.contains('Sign up');
		cy.contains('Log in');
	});
	it('Shows all recipes', () => {
		// cy.visit('/');
		cy.contains('Strawberry Jam');
		// has <ul>
		// cy.contains('Log in');
	});
});

// signUp
describe('Can sign up', () => {
	it('Can go to Sign Up page', () => {
		cy.visit('/');
		cy.contains('Sign up').click();
		cy.url().should('include', '/signUp');
	});
	it('Can create a new user', () => {
		// cy.visit('/');
		// cy.contains('Sign up').click();
		// cy.url().should('include', '/signUp');
		cy.get('input[name="name"]').type('Betty');
		cy.get('input[name="email"]').type('be@tty.com');
		cy.get('input[name="password"]').type('12345');
		// cy.get('input[name="avatar"]').type('');
		cy.get('button').click();
		cy.contains('Log out');
	});
	it('Can find new user in db', () => {});
});

// // logIn
describe('Can sign up, log out, log in', () => {
	it('Can create & log into new account', () => {
		cy.visit('/');
		cy.contains('Sign up').click();
		cy.url().should('include', '/signUp');
		cy.get('input[name="name"]').type('Betty');
		cy.get('input[name="email"]').type('be@tty.com');
		cy.get('input[name="password"]').type('12345');
		// cy.get('input[name="avatar"]').type('');
		cy.get('button').click();
		cy.contains('Log out').click();
		cy.contains('Log in').click();
		cy.url().should('include', '/logIn');
		cy.get('input[name="email"]').type('be@tty.com');
		cy.get('input[name="password"]').type('12345');
		cy.get('button').click();
		cy.contains('Log out');
		// cy.contains('Log in');
	});
});

// // home (member)
describe('Homepage for logged-in members', () => {
	it('Can show links to write Recipes, edit Profile, log out', () => {
		cy.visit('/');
		// Create a user
		cy.contains('Sign up').click();
		cy.url().should('include', '/signUp');
		cy.get('input[name="name"]').type('Betty');
		cy.get('input[name="email"]').type('be@tty.com');
		cy.get('input[name="password"]').type('12345');
		cy.get('button').click();
		// home for members
		cy.contains('Log out');
		cy.contains('My profile');
		cy.contains('my recipes');
		cy.contains('Write');
		cy.contains('Strawberry Jam');
	});
});

// // recipeWrite
describe('Can submit a new recipe', () => {
	it('Can write, submit, see new recipe', () => {
		cy.visit('/');
		// Create a user
		cy.contains('Sign up').click();
		cy.url().should('include', '/signUp');
		cy.get('input[name="name"]').type('Betty');
		cy.get('input[name="email"]').type('be@tty.com');
		cy.get('input[name="password"]').type('12345');
		cy.get('button').click();
		// Go to writePage
		cy.contains('Write').click();
		cy.get('input[name="title"]').type('Penne');
		cy.get('textarea[name="ingredients"]').type('Penne, Tomatoes');
		cy.get('textarea[name="instructions"]').type('Boil');
		cy.get('button').click();
		cy.contains('Strawberry Jam');
		// cy.contains('Penne');
	});
});

// // recipesMine
describe('Can choose to see only my recipes', () => {
	it('Can go to page with my recipes', () => {
		cy.visit('/');
		// Create a user
		cy.contains('Sign up').click();
		cy.url().should('include', '/signUp');
		cy.get('input[name="name"]').type('Betty');
		cy.get('input[name="email"]').type('be@tty.com');
		cy.get('input[name="password"]').type('12345');
		cy.get('button').click();
		// Write a recipe
		cy.contains('Write').click();
		cy.get('input[name="title"]').type('Penne');
		cy.get('textarea[name="ingredients"]').type('Penne, Tomatoes');
		cy.get('textarea[name="instructions"]').type('Boil');
		cy.get('button').click();
		cy.contains('Strawberry Jam');
		// cy.contains('Penne');
		// See only my recipes
		cy.contains('my recipes').click();
		cy.contains('Penne');
	});
});

// // recipeEdit
// describe('', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

// // recipeDelete
// describe('', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

// // userProfile
// describe('', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

// // userEdit
// describe('', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

// // userDelete
// describe('', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });
