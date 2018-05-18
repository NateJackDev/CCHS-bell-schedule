// server.js

// Express | Routes
var express = require('express');

// Initalize Express
var app = express();

// Schedule
var schedule = require('./schedule.json');

// Serving Static Files
app.use(express.static('public'));

// Send index.html page 
app.get("/", function (request, response) {
	// Grabbing the index file and sendning
	response.sendFile(__dirname + '/views/index.html');
});

// Send Schedule
app.get("/schedule", function (request, response) {
	response.send(schedule);
});

// Opening up a server on the port
var listener = app.listen(4000, function () {
	// Logging on the Server that the app started successfully
	console.log('You can view the app on http://localhost:' + listener.address().port);
});