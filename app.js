const yargs = require('yargs');
const fs = require('fs');
const getResults = require('./weather/weather');


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
        u: {
            demand: false,
            alias: 'units',
            describe: 'Set units',
            string: true,
        },
        d: {
            demand: false,
            alias: 'default',
            describe: 'Add default address',
            string: true
        },
        l: {
            demand: false,
            alias: 'language',
            describe: 'Set language',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.address) {
     let encodedAddress = encodeURIComponent(argv.address);
     let units = argv.units;
     let language = argv.language;

    getResults.getWeatherII(encodedAddress, units, language);

 } else if (!argv.default) {
     console.log('Using default address');
     try {
        let address = JSON.parse(fs.readFileSync('defaultAddress.json'));
        let encodedAddress = encodeURIComponent(address);
        console.log(encodedAddress)
        getResults.getWeatherII(encodedAddress, undefined, undefined);

     } catch (error) {
         console.log(error)
         throw new Error('No address found.');
     }
 }

if (argv.default) {
    console.log('Changing default address');
    fs.writeFileSync('defaultAddress.json', JSON.stringify(argv.default));
} 





