const request = require('request');
const yargs = require('yargs');
const _ = require('lodash') 

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

//Quality codes for MapQuest
const mapQuestQualityCodes = ['P1', 'L1', 'I1', 'B1', 'B2', 'B3', 'A4', 'A5', 'A6', 'Z1', 'Z1', 'Z3', 'Z4'];

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=zGfoFArnJz7qqtzwBCE7LuAxD0yON8QI&location=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    if (error) {
        //handle serve error
        console.log('Cannot connect to MapQuest Server')
    } else if (body.info.statuscode === 400){
        console.log('No data retrieved');
      } else if (((body.results[0].locations[0].geocodeQualityCode.substring(2)).match(/X/g) || []).length > 0){
        //can alter above condition to change quality of user input  
        console.log('Invalid Address, needs city, country or postcode');
        } else if (body.info.statuscode === 0) {
            //provid search result against user input so they can verify result
            let locationInfo = body.results[0]
            console.log(`Provided Address: ${locationInfo.providedLocation.location}`)
            console.log(`Located Address: ${locationInfo.locations[0].street}, 
                ${locationInfo.locations[0].adminArea5}, 
                ${locationInfo.locations[0].adminArea4},
                ${locationInfo.locations[0].adminArea1},
                ${locationInfo.locations[0].postalCode}`);
            console.log(`Longitude: ${locationInfo.locations[0].latLng.lng}`)
            console.log(`Latitude: ${locationInfo.locations[0].latLng.lat}`)
    }
})
