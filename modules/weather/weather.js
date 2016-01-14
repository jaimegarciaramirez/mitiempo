var logger = require('../logger/logger')
var weatherRequest = require('./weather-requests')

module.exports = function(application) {
    logger.info('Binding endpoints in weather')
    
    application.get('/current', function(request, response) {
        weatherRequest.currentByZip(20187).then(function(result) {
            response.send(result)
        })
    })
}