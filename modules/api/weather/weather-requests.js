var q = require('q')
var http = global.requireLocal('/api/http-request')
var logger = global.requireLocal('/logger/logger')

module.exports = {
    currentByZip: function(zipCode) {
        return http.get('/data/2.5/weather', {
            zip: zipCode + ',us', 
            units: 'imperial'
        })
    },    
    forecast: function(id) {
        return http.get('/data/2.5/forecast/daily', {
            id: id, 
            units: 'imperial'
        })
    }    
}