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
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=zGfoFArnJz7qqtzwBCE7LuAxD0yON8QI&location=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    if (error) {
        //handle serve error
        console.log('Cannot connect to Google Server')
        //ok quality for street number
        //must have good quality street name
        //must have good quality town/city
        //ok if no postcode
    } else if (body.results[0].locations[0].geocodeQualityCode.charAt(3) === 'X') {
        //handle user error
        console.log('Invalid Address')
    } else if (body.info.statuscode === 0) {
    console.log(`Provided Address: ${body.results[0].providedLocation.location}`)
    console.log(`Located Address: ${body.results[0].locations[0].street}, 
        ${body.results[0].locations[0].adminArea5}, 
        ${body.results[0].locations[0].adminArea4},
        ${body.results[0].locations[0].adminArea1},
        ${body.results[0].locations[0].postalCode}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`)
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`)
    }
})
