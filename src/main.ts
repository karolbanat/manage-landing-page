import './style.css';

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
