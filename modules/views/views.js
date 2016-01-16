var express = require('express')
var logger = global.requireLocal('logger/logger')
var weatherRequests = global.requireLocal('api/weather/weather-requests')

module.exports = function(application) {
    
    function friendlyDate(date) {
        var month = date.getMonth() + 1
        var day = date.getDate()
        var year = date.getYear()
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return month + '/' + day + '/' + year
    }

    logger.info('Binding CSS for views to /css folder')
    application.use('/css', express.static('css'))
    application.use('/font', express.static('font'))

    logger.info('Binding templates for views to /views folder')
    application.set('view engine', 'jade')
    
    application.get('/hourly', function(request, response) {
        var date = new Date(request.query.date)
        var result  = {friendlyDate: friendlyDate(date)}
        console.log('got params:', request.query)
        weatherRequests.hourly(request.query.cityId, date).then(function(hourByHourResult) {
            result.hourByHour = hourByHourResult
            response.render('hourly.jade', result)  
        })  
    })
    
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