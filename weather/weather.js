const request = require('request')

function getWeather(latitude, longitude, callback) {
    //let latitude = 51.549624;
    //let longitude = -0.259335;

    request({ 
        url:`https://api.darksky.net/forecast/abf747543355ad6d3add9ac2eb0700f4/${latitude},${longitude}`,
        json: true
        }, (error, response, body) => {
            if (error) {
                callback('Unable to connect to forcast.io')
            } else if (!error && response.statusCode === 400) {
                callback(undefined, 'Unable to get weather, incorrect details')
            } else { 
                callback(undefined, {
                    temperature: body.currently.temperature,
                    summary: body.currently.summary,
                    apparentTemp: body.currently.apparentTemperature
            }    
       )};
    })
};


module.exports.getWeather = getWeather;

