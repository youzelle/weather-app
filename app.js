const request = require('request');
const yargs = require('yargs');

//setup details for commandline
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetc weather for',
            string: true
        }

    })
    .help()
    .alias('help', 'h')
    .argv;

//store address as external variable

let encodedAddress = encodeURIComponent(argv.address);

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=OI1O0UlBKDjkR2e7claLT6xRAh1BZdVG&location=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    //prettify what is printed to console
    //console.log(JSON.stringify(body, undefined, 2));
    console.log(`Address: ${body.results[0].providedLocation.location}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`)
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`)
})
