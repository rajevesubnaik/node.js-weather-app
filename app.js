// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// my api key 14bfd0971802cbdfacb594261bf22225
// ex api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}

const https = require('https');
const http = require('http');
const querystring = require('querystring');
const { loadavg } = require('os');

// print the weather to the console
function printMessage(location, currentTemp, feelsLike, humidity) {
    const message = `The current temperature in ${location} is ${currentTemp}F, feels like ${feelsLike}F with a humidity of ${humidity}%.`;
    console.log(message);
}

// print error messages
function printError(error) {
    console.log(error.message)
}

function getWeather(location) {
    const parameters = {
        APPID: '14bfd0971802cbdfacb594261bf22225',
    }

    const zipCode = parseInt(location);
    if (!isNaN(zipCode)) {
        parameters.zip = zipCode + ',us';
    } else {
        parameters.q = location + ',us';
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}&units=imperial`;
        const request = https.get(url, response => {
            if (response.statusCode === 200) {
                let body = "";
                response.on('data', data => {
                    body += data.toString();
                });
                response.on('end', () => {
                    try {
                        const profile = JSON.parse(body)
                        printMessage(profile.name, profile.main.temp, profile.main.feels_like, profile.main.humidity);    
                    } catch (error) {
                        printError(error);
                    }
                    
                });    
            } else {
                const message  = `${location} is not a valid location. Type a valid city. For two word cities separate name with a '-' for example 'San-Francisco'. (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });
        request.on('error', error => printError(error));
    } catch (error) {
        printError(error);
    }
}

const getLocation = process.argv.slice(2).map(r => r.replace('-', ' '));
console.log(getLocation);
getLocation.forEach (getWeather);