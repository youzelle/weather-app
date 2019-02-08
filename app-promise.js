const yargs = require('yargs');
const fs = require('fs');
const getResults = require('./weather/weather-promise');


console.log('________Starting WeatherApp__________');

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
     let encodedAddress = encodeURIComponent(argv.address);

    getResults.getWeatherII(encodedAddress);

 } else if (!argv.default) {
     console.log('Using default address');
     try {
        let address = JSON.parse(fs.readFileSync('defaultAddress.json'));
        let encodedAddress = encodeURIComponent(address);

        getResults.getWeatherII(encodedAddress);
        console.log(getResults.getWeatherII(encodedAddress));

     } catch (error) {
         console.log(error)
         throw new Error('No address found.');
     }
 }

if (argv.default) {
    console.log('Changing default address');
    fs.writeFileSync('defaultAddress.json', JSON.stringify(argv.default));
} 





