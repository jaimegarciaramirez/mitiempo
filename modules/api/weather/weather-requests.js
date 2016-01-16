var q = require('q')
var http = global.requireLocal('/api/http-request')
var logger = global.requireLocal('/logger/logger')

var DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function dayOfWeek(date) {
    return DAYS_OF_WEEK[date.getDay()]
}

function sameDayDates(date1, date2) {
    return date1.getDate() == date2.getDate() && 
        date1.getMonth() == date2.getMonth() && 
        date1.getYear() == date2.getYear()
}

function humanFriendlyTime(date) {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = (hours < 12 ? 'AM' : 'PM')
    if (hours > 12) {
        hours = hours - 12
    }
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    return hours + ':' + minutes + ' ' + ampm
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
                val.isoDate = date.toISOString()
                val.day = dayOfWeek(date)
            }
            return response
        })
    },
    hourly: function(id, targetDate) {
        return http.get('/data/2.5/forecast', {
            id: id,
            units: 'imperial'
        }).then(function(result) {
            var response = JSON.parse(result)
            var list = []
            for (var i = 0; i < response.list.length; i++) {
                var val = response.list[i]
                var date = new Date(val.dt * 1000)
                if (sameDayDates(targetDate, date)) {
                    list.push(val)
                    val.date = date
                    val.day = dayOfWeek(date)
                    val.time = humanFriendlyTime(date)
                }
            }
            response.list = list
            return response
        })
    }    
}