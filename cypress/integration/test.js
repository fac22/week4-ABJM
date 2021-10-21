// beforeEach(() => {
// cy.task('resetDb');
// });

// describe('Testing Works', () => {
// 	it('Passes when visiting google', () => {
// 		cy.visit('www.google.com');
// 	});
// });

/*
Routes:
- home unknown: login/sign-up button, all recipes
- signUp
- logIn
- home known: login/sign-up button, all recipes
- recipeWrite
- recipesAll
- recipesMine
- recipeEdit
- recipeDelete
- userProfile
- userEdit
- logout
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
		cy.visit('/');
		cy.contains('Strawberry Jam');
		// has <ul>
		// cy.contains('Log in');
	});
});

// // signUp
// describe('Can sign up', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

// // logIn
// describe('Can log in', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

// // home (member)
// describe('Homepage for logged-in members', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

// // recipeWrite
// describe('Can submit a new recipe', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

// // recipesAll
// describe('', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

// // recipesMine
// describe('', () => {
// 	it('', () => {
// 		cy.visit('/');
// 	});
// });

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

// // logout
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
