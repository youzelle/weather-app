const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')

//setup details for commandline
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }

    })
    .help()
    .alias('help', 'h')
    .argv;

    //abstracting callbacks
    geocode.geocodeAddress(argv.address, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        }else {
            weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                if (errorMessage) {
                    console.log(errorMessage);
                }else {
                    console.log(`Here's the weather for ${results.locatedAddress}.`);
                    console.log(`It's currently ${weatherResults.temperature} and ${weatherResults.summary}. It feels like ${weatherResults.apparentTemp}`);
                }
             });
        }
    });

 