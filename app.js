const weather = require('./weather');

const getLocation = process.argv.slice(2).map(r => r.replace('-', ' '));
console.log(getLocation);
getLocation.forEach (weather.get);