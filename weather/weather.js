const axios = require('axios');
const fs = require('fs');

function getWeatherII(encodedAddress, units, language) {
    console.log('units', units ? `units=${units}` : 'auto');
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
        
        units = units ? `units=${units}` : 'auto';
        language = language ? `lang=${language}` :  'lang=en';
        console.log(language)
        
        const weatherURL = `https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}?${units}&${language}`;
        console.log(weatherURL)
        return axios.get(weatherURL);

    }).then((response) => {

        const temp = response.data.currently.temperature;
        const apparentTemp = response.data.currently.apparentTemperature;
        const summary = response.data.currently.summary;

        console.log(`It's currently ${temp} degrees and ${summary}. It feels like ${apparentTemp} degrees`);

    }).catch(error => {
        if (error.code === 'ENOTFOUND') {
            console.log('Could not connect to MapRequest server');
        } else {
            console.log(error.message);
        }
    });
};

module.exports.getWeatherII = getWeatherII;
 