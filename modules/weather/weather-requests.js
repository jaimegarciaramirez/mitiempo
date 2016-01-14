var http = require('./http-request')
var q = require('q')
var logger = require('../logger/logger')

//http://api.openweathermap.org/data/2.5/weather?zip=20187,us&appid=2de143494c0b295cca9337e1e96b00e0&units=imperial
var options = {
    port: 80,
    hostname: 'api.openweathermap.org',
    method: 'GET',
    path: '/data/2.5/weather?zip=20187,us&appid=2de143494c0b295cca9337e1e96b00e0&units=imperial'
}

module.exports = {
    currentByZip: function(zipCode) {
        logger.info('Loading the zip code')       
        return http.get('/data/2.5/weather', {
            zip: zipCode + ',us', 
            units: 'imperial'
        })
    }    
}