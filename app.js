// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// my api key 14bfd0971802cbdfacb594261bf22225
// ex api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}

const https = require('https');

function getWeather(location) {
    const request = https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${location},us&appid=14bfd0971802cbdfacb594261bf22225&units=imperial`, response => {
        console.log(response.statusCode);
        let body = "";
        response.on('data', data => {
            body += data.toString();
        });
        response.on('end', () => {
            console.log(body);
        });
    });
}

getWeather(32839);