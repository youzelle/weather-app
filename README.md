# weather-app
Geolocation weather app.

The weather found is based on latitude and longitude coordinates. 

USE:

To get the weather for a default address:
node app.js 

To get the weather for a specific address:
node app.js -a '[ADDRESS]'

To change default address:
node app.js -d '[ADDRESS]'
(This does not give results, only changes default)


The address should have as much detail as possible to be accurate. 
A street number and name will provide the weather, but it may not be 
the correct location, e.g. same street name and city but different city. 
A street number will result in an error.

Todo
- Make units and language yargs option
- Add song of the day based on weather
- Add date and time to forecast
