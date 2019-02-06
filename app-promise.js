const yargs = require('yargs');
const axios = require('axios');
const fs = require('fs');


console.log('________Starting WeatherApp__________')

let encodedAddress;

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true,
            default: ''
        },
        si: {
            demand: false,
            alias: 'units',
            describe: 'Change to SI units, i.e. UK units',
            string: true,
        },
        d: {
            demand: false,
            alias: 'default',
            describe: 'Add default address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.address) {
     console.log('Use entered address');
     encodedAddress = encodeURIComponent(argv.address);
 } else if (!argv.default) {
     console.log('Use default address');
     try {
         const address = JSON.parse(fs.readFileSync('defaultAddress.json'));
         encodedAddress = encodeURIComponent(address);
     } catch (error) {
         throw new Error('Default Address: File not found. Please enter address');
     }
 }


function defaultAddress() {
     if (argv.default) {
            console.log('Add/change default address');
            fs.writeFileSync('defaultAddress.json', JSON.stringify(argv.default));
     } 
}


console.log('address', argv.a);
console.log('default', argv.d);
console.log('ea', encodedAddress);
console.log('da', defaultAddress());


//store key as external variable
let geoKey = 'zGfoFArnJz7qqtzwBCE7LuAxD0yON8QI';
let geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${geoKey}&location=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
    if (((response.data.results[0].locations[0].geocodeQualityCode.substring(2)).match(/X/g) || []).length > 1) {
        throw new Error('Unable to find that address')
    }
    const locationInfo = response.data.results[0];
    const lat = locationInfo.locations[0].latLng.lat;
    const lng = locationInfo.locations[0].latLng.lng;

    console.log('Here\'s the weather for: ', locationInfo.locations[0].street, locationInfo.locations[0].adminArea5,
                            locationInfo.locations[0].adminArea4, locationInfo.locations[0].adminArea1, 
                            locationInfo.locations[0].postalCode);
    
    const weatherKey = 'abf747543355ad6d3add9ac2eb0700f4';
    const optionUnits = 'units=si';
    
    const weatherURL = `https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}?${optionUnits}`;

    return axios.get(weatherURL);

}).then((response) => {

    const temp = response.data.currently.temperature;
    const apparentTemp = response.data.currently.apparentTemperature;
    const summary = response.data.currently.summary;

    console.log(`It's currently ${temp}C and ${summary}. It feels like ${apparentTemp}C`);

}).catch(error => {
    if (error.code === 'ENOTFOUND') {
        console.log('Could not connect to MapRequest server');
    } else {
        console.log(error.message);
    }
});

