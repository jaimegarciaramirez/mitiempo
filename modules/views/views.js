var express = require('express')
var logger = global.requireLocal('logger/logger')
var weatherRequests = global.requireLocal('api/weather/weather-requests')

module.exports = function(application) {
    function bindEndpointToTemplate(endpoint, parameters) {
        var template = endpoint
        if (endpoint == '') {
            template = 'index'
        }
        application.get('/' + endpoint, function(request, response) {
            response.render(template + '.jade', parameters)
        })
    }

    logger.info('Binding CSS for views to /css folder')
    application.use('/css', express.static('css'))
    application.use('/font', express.static('font'))

    logger.info('Binding templates for views to /views folder')
    application.set('view engine', 'jade')
    bindEndpointToTemplate('hourly', {title: 'miTiempo - Domingo'})
    
    
    application.get('/', function(request, response) {
        weatherRequests.currentByZip('20187').then(function(result) {
            var currentWeather = result
            weatherRequests.forecast(currentWeather.id).then(function(forecastResult) {
                var weatherForecast = forecastResult
                currentWeather.forecast = weatherForecast
                response.render('index.jade', currentWeather)
            })
        });       
    })    
}