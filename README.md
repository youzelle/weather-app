# weather-app
Geolocation weather app.

The weather found is based on latitude and longitude coordinates. 

USE - ADDRESS:

To get the weather for a default address & settings:
node app.js 

To get the weather for a specific address:
node app.js -a '[ADDRESS]'

To change default address:
node app.js -d '[ADDRESS]'
(This does not give results, only changes default)

USE - UNITS:

The default units are based on the geographical location of the address. To change this type

-u '[units]'

us: Imperial units
si: SI units

USE - LANGUAGES

The default language for the summary (i.e. rain, drizzle etc) is English, to change this

-l '[language]'

ar: Arabic
es: Spanish
ru: Russian






The address should have as much detail as possible to be accurate. 
A street number and name will provide the weather, but it may not be 
the correct location, e.g. same street name and city but different city. 
A street number will result in an error.

Todo
- Add song of the day based on weather
- Add date and time to forecast
