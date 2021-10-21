'use strict';

const form = document.querySelector('form');

form.setAttribute('novalidate', ''); //prevents the built-in errors

form.addEventListener('submit', (event) => {
	const allInputsValid = event.target.checkValidity();
	if (!allInputsValid) {
		event.preventDefault();
	}
});

const inputs = form.querySelectorAll('input');

inputs.forEach((input) => {
	input.setAttribute('aria-invalid', false);
	input.addEventListener('invalid', () => {
		input.setAttribute('aria-invalid', true);

		const errorId = input.id + 'Requirements';
		const errorContainer = form.querySelector('#' + errorId);
		console.log(errorContainer);
		// errorContainer.textContent = input.validationMessage;
		errorContainer.classList.add('error-color');
	});

	input.addEventListener('input', () => {
		input.setAttribute('aria-invalid', false);

		const errorId = input.id + 'Requirements';
		const errorContainer = form.querySelector('#' + errorId);
		// errorContainer.textContent = '';
		errorContainer.classList.remove('error-color');
	});
});

const textareas = form.querySelectorAll('textarea');

textareas.forEach((textarea) => {
	textarea.setAttribute('aria-invalid', false);
	textarea.addEventListener('invalid', () => {
		textarea.setAttribute('aria-invalid', true);

		const errorId = textarea.id + 'Requirements';
		const errorContainer = form.querySelector('#' + errorId);
		console.log(errorContainer);
		// errorContainer.textContent = input.validationMessage;
		errorContainer.classList.add('error-color');
	});

	textarea.addEventListener('input', () => {
		textarea.setAttribute('aria-invalid', false);

		const errorId = textarea.id + 'Requirements';
		const errorContainer = form.querySelector('#' + errorId);
		// errorContainer.textContent = '';
		errorContainer.classList.remove('error-color');
	});
});
