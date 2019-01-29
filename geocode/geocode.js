const request = require('request');

function geocodeAddress(address, callback) {
        //store address as external variable
        let encodedAddress = encodeURIComponent(address);
        //store key as external variable
        let geoKey = 'zGfoFArnJz7qqtzwBCE7LuAxD0yON8QI';

        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${geoKey}&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                //handle serve error
                callback('Cannot connect to MapQuest Server')
            } else if (body.info.statuscode === 400){
                callback('No data retrieved');
            } else if (((body.results[0].locations[0].geocodeQualityCode.substring(2)).match(/X/g) || []).length > 0){
                //can alter above condition to change quality of user input  
                console.log('Invalid Address, needs city, country or postcode');
                } else if (body.info.statuscode === 0) {
                    const locationInfo = body.results[0]
                    callback(undefined, {
                     providedAddress: locationInfo.providedLocation.location,
                     locatedAddress:  locationInfo.locations[0].street +','+ 
                                      locationInfo.locations[0].adminArea5 +','+  
                                      locationInfo.locations[0].adminArea4 +','+  
                                      locationInfo.locations[0].adminArea1 +','+  
                                      locationInfo.locations[0].postalCode, 
                    Longitude: locationInfo.locations[0].latLng.lng,
                    Latitude: locationInfo.locations[0].latLng.lat
                });
            }
        })
    };




module.exports.geocodeAddress = geocodeAddress;

