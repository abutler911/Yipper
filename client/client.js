console.log('Hello world');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const yipsElement = document.querySelector('.yips');
const API_URL =
	window.location.hostname === 'localhost' ? 'http://localhost:5000/yips' : 'https://yipper-api.vercel.app/yips';

loadingElement.style.display = '';

listAllYips();

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(form);
	const name = formData.get('name');
	const content = formData.get('content');
	const yip = {
		name,
		content
	};
	form.style.display = 'none';
	loadingElement.style.display = '';

	fetch(API_URL, {
		method: 'POST',
		body: JSON.stringify(yip),
		headers: {
			'content-type': 'application/json'
		}
	})
		.then((response) => response.json())
		.then((createdYip) => {
			form.reset();
			setTimeout(() => {
				form.style.display = '';
			}, 5000);
			listAllYips();
		});
});

function listAllYips() {
	yipsElement.innerHTML = '';
	fetch(API_URL).then((response) => response.json()).then((yips) => {
		console.log(yips);
		yips.reverse();
		yips.forEach((yip) => {
			const div = document.createElement('div');
			const header = document.createElement('h3');
			header.textContent = yip.name;

			const contents = document.createElement('p');
			contents.textContent = yip.content;

			const date = document.createElement('small');
			date.textContent = new Date(yip.created);
			div.appendChild(header);
			div.appendChild(contents);
			div.appendChild(date);

			yipsElement.appendChild(div);
		});
		loadingElement.style.display = 'none';
	});
}
