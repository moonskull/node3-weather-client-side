const form = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const btn = document.querySelector('#search');
form.addEventListener('submit', (event) => {
	event.preventDefault();

	const city = input.value;
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';
	// fetch(`http://localhost:3000/weather?address=${city}`).then((response) => {
	// 	return response.json().then((data) => {
	// 		if (data.error) {
	// 			messageTwo.textContent = data.error;
	// 		} else {
	// 			messageOne.textContent = `Location: {data.location}, Forecast:${data.forecast}`;
	// 		}
	// 	});
	// });
	fetch(`/weather?address=${city}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			if (data.error) {
				messageOne.textContent = '';
				messageTwo.textContent = data.error;
			} else {
				messageOne.textContent = `Location: ${data.location}.`;
				messageTwo.textContent = `Forecast:${data.forecastData}`;
			}
		});
});
