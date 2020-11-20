// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// my api key 14bfd0971802cbdfacb594261bf22225
// ex api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}

const https = require('https');
const { loadavg } = require('os');

function printMessage(location, currentTemp, humidity) {
    const message = `The current temperature in ${location} is ${currentTemp}F with a humidity of ${humidity}%.`;
    console.log(message);
}

function getWeather(location) {
    const request = https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${location},us&appid=14bfd0971802cbdfacb594261bf22225&units=imperial`, response => {
        let body = "";
        response.on('data', data => {
            body += data.toString();
        });
        response.on('end', () => {
            const profile = JSON.parse(body)
            printMessage(profile.name, profile.main.temp, profile.main.humidity);
        });
    });
}

const getLocation = process.argv.slice(2);
// console.log(getLocation);
getLocation.forEach (getWeather);