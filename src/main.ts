import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import './style.css';

const navToggleButton: HTMLButtonElement = document.querySelector('#primary-nav-toggle')!;
const signUpForm: HTMLFormElement = document.querySelector('#sign-up-form')!;
const emailInput: HTMLInputElement = signUpForm.querySelector('input[type="email"]')!;
const submitButton: HTMLButtonElement = signUpForm.querySelector('button[type="submit"]')!;

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

new Splide('.splide', {
	start: 1,
	arrows: false,
	classes: {
		pagination: 'splide__pagination slider-pagination',
		page: 'splide__pagination__page slider-dot',
	},
	focus: 'center',
	gap: '3rem',
	padding: {
		left: '1.6rem',
		right: '1.6rem',
	},
	mediaQuery: 'min',
	type: 'loop',
	live: true,
	clones: 2,
	breakpoints: {
		768: {
			autoWidth: true,
			padding: {
				left: 0,
				right: 0,
			},
		},
	},
}).mount();

navToggleButton.addEventListener('click', handleToggleButton);
submitButton.addEventListener('click', (e: Event) => {
	e.preventDefault();
	const email: string = emailInput.value;

	if (isBlank(email)) {
		displayError(emailInput, 'This field is required');
		return;
	}

	if (!isValidEmail(email)) {
		displayError(emailInput, 'Please insert a valid email');
		return;
	}

	clearError(emailInput);
});

function handleToggleButton(e: Event): void {
	const button: HTMLButtonElement = e.target as HTMLButtonElement;
	const targetId: string = button.getAttribute('aria-controls') || '';
	const targetElement: HTMLElement | null = document.querySelector(`#${targetId}`);
	const wasExpanded: boolean = button.getAttribute('aria-expanded') === 'true';

	if (targetElement) {
		button.setAttribute('aria-expanded', (!wasExpanded).toString());
		targetElement.toggleAttribute('data-expanded', !wasExpanded);
		toggleDropshadow(!wasExpanded);
	}
}

function toggleDropshadow(toggle: boolean) {
	if (toggle) {
		const dropshadow: HTMLElement = document.createElement('div');
		dropshadow.classList.add('dropshadow');
		document.body.appendChild(dropshadow);
	} else {
		const dropshadow: HTMLElement | null = document.querySelector('.dropshadow');
		if (dropshadow) dropshadow.remove();
	}
}

function displayError(input: HTMLInputElement, message: string = ''): void {
	const formGroup: HTMLElement | null = input.closest('.input-group');
	let error: HTMLElement | null;

	if (formGroup) {
		formGroup.classList.add('error');
		error = formGroup.querySelector('.form-error');
		if (error) error.innerText = message;
	}
}

function clearError(input: HTMLInputElement): void {
	const formGroup: HTMLElement | null = input.closest('.input-group');
	let error: HTMLElement | null;

	if (formGroup) {
		formGroup.classList.remove('error');
		error = formGroup.querySelector('.form-error');
		if (error) error.innerText = '';
	}
}

function isBlank(value: string): boolean {
	return value === '';
}

function isValidEmail(email: string): boolean {
	return EMAIL_REGEX.test(email);
}
