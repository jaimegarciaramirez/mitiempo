# Getting started

Blab You need to have nodejs and npm installed, they can be installed from here: https://nodejs.org/en/

After that, execute `npm install` to install all required dependencies

You can run the application by executing `node index.js`. In order for the application to run correctly, you need to provide an API key as an environment variable `WEATHER_API_KEY` from http://openweathermap.org/api.


# APIs from openwathermap.org

**Note** All API's should have the `units=imperial` appended to get the 
results in Farenheit. Otherwise, they default to Kelvin!!

## Common Fields

* `units` should be defaulted to `imperial`
* `id` is the city id. The easiest way to get this is by looking up a city by zip code on the current weather API and retrieving the `id` field. **TODO:** find out if there's a way to determine this from just a zip code lookup
* `appid` is this application's key, stored as the `WEATHER_API_KEY` environment variable

## Current weather

This API offers the current weather for a given zip code. It also has the added 
benefit of providing a city id. It helps to add `us` as part of the `zip` request
parameter to define that this is a zip code in the United States.

`http://api.openweathermap.org/data/2.5/weather?zip=94040,us`

## 16 day forecast

This API offers a 16 day forecast which includes low and high temperature for 
a period of 16 days
`http://api.openweathermap.org/data/2.5/forecast/daily?id=4792255`

## 5 day forecast

This API provides the weather information for 5 days for 3 hour increments

`http://api.openweathermap.org/data/2.5/forecast?id=524901`
