var express = require('express')
var logger = global.requireLocal('logger/logger')

module.exports = function(application) {
    logger.info('Binding endpoints for mock requests')
    application.use('/data', express.static('mocks/data'))    
    application.get('/data/*', function(request, response) {
        logger.info('requested ', request.path)
        logger.info('replying with mocked response at ', request.path + '.json')
        response.sendFile(__dirname + request.path + '.json')        
    });
}