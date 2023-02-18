import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import './style.css';

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

const navToggleButton: HTMLButtonElement = document.querySelector('#primary-nav-toggle')!;

navToggleButton.addEventListener('click', handleToggleButton);

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
