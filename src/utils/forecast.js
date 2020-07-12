// const request = require('postman-request');
const axios = require('axios');
const forecast = (latitude, longitude, callback) => {
	const units = 'm';
	const url = `http://api.weatherstack.com/current?access_key=dccee915fa287df783c9ff2cb83a1514&query=${latitude},${longitude}&units=${units}#`;
	axios
		.get(url)
		.then(({ data }) => {
			const { weather_descriptions, temperature, feelslike } = data.current;
			if (data.error) {
				callback('Something is wrong with the given params', undefined);
				return;
			}
			callback(
				undefined,
				`${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} out there!!.`
			);
		})
		.catch((err) => {
			callback('Unable to connect to the weather API', undefined);
		});
};

module.exports = forecast;

// `http://api.weatherstack.com/current?access_key=dccee915fa287df783c9ff2cb83a1514&query=70.5,44.1545&units=m#`
