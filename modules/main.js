var logger = require('./logger/logger')

module.exports = function(application, prefix) {
    logger.info('Binding endpoints in main')
    
    application.get(prefix + '/', function(request, response) {
        response.send('hello world blab')
    })
}