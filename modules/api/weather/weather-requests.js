var q = require('q')
var http = global.requireLocal('/api/http-request')
var logger = global.requireLocal('/logger/logger')

module.exports = {
    currentByZip: function(zipCode) {
        logger.info('Loading the zip code')       
        return http.get('/data/2.5/weather', {
            zip: zipCode + ',us', 
            units: 'imperial'
        })
    }    
}