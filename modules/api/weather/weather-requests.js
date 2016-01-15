var q = require('q')
var http = global.requireLocal('/api/http-request')
var logger = global.requireLocal('/logger/logger')

var DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function dayOfWeek(date) {
    return DAYS_OF_WEEK[date.getDay()]
}

module.exports = {
    currentByZip: function(zipCode) {
        return http.get('/data/2.5/weather', {
            zip: zipCode, 
            units: 'imperial'
        }).then(function(result) {
            return JSON.parse(result)
        })
    },    
    forecast: function(id) {
        return http.get('/data/2.5/forecast/daily', {
            id: id,
            cnt: 5, 
            units: 'imperial'
        }).then(function(result) {
            var response = JSON.parse(result)
            for (var i = 0; i < response.list.length; i++) {
                var val = response.list[i]
                var date = new Date(val.dt * 1000)
                val.date = date
                val.day = dayOfWeek(date)
            }
            return response
        })
    }    
}