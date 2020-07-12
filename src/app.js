const express = require('express');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express();

const path = require('path');
const hbs = require('hbs');
const { ifError } = require('assert');
const { response } = require('express');

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// app.use "A way to tell express to use whateve a file inside that folder"

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDir));

// Root
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Andrew Mead'
	});
});

// About page
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About page',
		name: 'Random user'
	});
});

// Help page
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help us to make the world a better place',
		name: 'Kamikazi'
	});
});

// Weather "/weather"
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide an address'
		});
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				latitude,
				longitude,
				location,
				forecastData
			});
		});
	});
});

// Products
app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404 - Page not found',
		errorMessage: 'Help article not found',
		name: 'Anonymous'
	});
});

// 404 - must be last route
app.get('*', (req, res) => {
	res.render('404', {
		title: '404 - Page not found',
		errorMessage: 'Page not found',
		name: 'Mr. "???"'
	});
});

// Establishing the server
app.listen(3000, () => {
	console.log('The server is running!!');
});
