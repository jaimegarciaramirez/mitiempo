var logger = require('./logger/logger')

module.exports = function(application) {
    logger.info('Binding endpoints in main')
    
    application.get('/', function(request, response) {
        response.send('hello world blab')
    })
}