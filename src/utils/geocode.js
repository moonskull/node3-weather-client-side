const axios = require('axios');
const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1Ijoic3Vuc2t1bGwiLCJhIjoiY2tjZGFnbzZjMGNwbTJycG5uZzA4cTR6NSJ9.sF2_XQKXsy0irCrAt_QyvA&limit=1`;

	axios
		.get(url)
		.then(({ data }) => {
			const { features } = data;
			if (features.length === 0) {
				callback('Location Not Found. Try another search', undefined);
			} else {
				callback(undefined, {
					longitude: features[0].center[0],
					latitude: features[0].center[1],
					location: features[0].place_name
				});
			}
		})
		.catch((err) => {
			callback('Unable to connect to location services', undefined);
		});
};

module.exports = geocode;
