var logger = require('../logger/logger')
var weatherRequest = require('./weather-requests')

module.exports = function(application) {
    logger.info('Binding endpoints in weather')
    
    application.get('/current', function(request, response) {
        weatherRequest.currentByZip(request.query.zip).then(function(result) {
            response.send(result)
        })
    })
}