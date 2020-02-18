//Node.js Api's are only available after they have been required.

//Require Https Module
const https = require('https');

//Require Http Module
const http = require('http');

//Print Error Messages
function printError(error) {
    console.error(error.message);
}

function printMessage(username, badgecount, point) {
   const message = `${username} has ${badgecount} total badges, and ${point} JavaScript points.`;
   console.log(message);
}

function get(username) {

//Connect to Treehouse Api to get data
try {
const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
    if (response.statusCode === 200) {
let body = "";
// Read the data
// The response object has a data event that get's emitted when data comes in.
// This data is coming back in buffers- we convert these to strings and add them to our data variable.
response.on('data', data => {
    body += data.toString();
});

//Whenever you see the data event - you will see the end event to complete reading the data.
response.on('end', () => {
    try {
// Parse the data
const profile = JSON.parse(body);
    
// Print the data
printMessage(username, profile.badges.length, profile.points.JavaScript);
} catch (error) {
    printError(error);
    }
    });
} else {
    const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
    const statusCodeError = new Error(message);
    printError(statusCodeError);
}
});

request.on('error', printError);
} catch(error) {
    printError(error);
}
}

module.exports.get = get;