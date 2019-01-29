const yargs = require('yargs');
const geocode = require('./geocode/geocode');

console.log(geocode)

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

    geocode.geocodeAddress(argv.address);
