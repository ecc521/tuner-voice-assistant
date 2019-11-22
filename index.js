'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

console.log("Setting up");

app.intent('PLAY_FREQUENCY', (conv, {hertz, duration}) => {
    conv.close("Hello! You want " + hertz + " hertz" + (duration?"for " + duration + " seconds.":"."));
});

app.intent('PLAY_NOTE', (conv, {note, duration}) => {
    conv.close("Hello! You want " + note + ".");
});

app.intent('SET_TRANSPOSE', (conv, {units, number, direction}) => {
    conv.close("Hello! You want to transpose " + number + " " + units + " " + direction + ".");
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
