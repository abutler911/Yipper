console.log('Hello world');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(form);
	const name = formData.get('name');
	const content = formData.get('content');
	const yip = {
		name,
		content
	};
	console.log(yip);
	form.style.display = 'none';
	loadingElement.style.display = '';
});
