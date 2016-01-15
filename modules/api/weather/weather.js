var logger = global.requireLocal('logger/logger')
var weatherRequest = global.requireLocal('api/weather/weather-requests')

module.exports = function(application, prefix) {
    logger.info('Binding endpoints in weather')
    
    application.get(prefix + '/current', function(request, response) {
        weatherRequest.currentByZip(request.query.zip).then(function(result) {
            response.send(result)
        })
    })
}