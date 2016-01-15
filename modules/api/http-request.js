var http = require('http')
var q = require('q')
var logger = global.requireLocal('logger/logger')
var args = global.requireLocal('arguments/arguments')
var apiConfiguration = global.requireLocal('api/configuration')

var cache = {}

var options = apiConfiguration.options

function clone(source) {
    return JSON.parse(JSON.stringify(source))
}

function toQueryString(params) {
    var queryString = ''
    var first = true
    for(var key in params) {
        if (!first) {
            queryString += '&'
        } else {
            first = false
        }
        queryString += key + '=' + encodeURIComponent(params[key])
    }
    return queryString
}

function populatePathWithKey(opts, params) {
    var queryString = ''
    if (!(params == undefined)) {
        queryString = toQueryString(params);
    }
    logger.info('Built HTTP path: GET http://' + opts.hostname + ':' + 
        opts.port + opts.path + '?' + queryString)
    opts.cacheablePath = opts.path + '?' + queryString
    opts.path += '?appid=' + args.WEATHER_API_KEY + 
        (queryString != '' ? '&' + queryString : '')
}

module.exports = {
    get: function(path, params) {
        var opts = clone(options)
        opts.method = 'GET'
        opts.path = path
        populatePathWithKey(opts, params)
        if (cache[opts.cacheablePath] != undefined) {
            logger.info('returning ' + opts.cacheablePath + ' cached promise')
            return cache[opts.cacheablePath]
        } else {
            logger.info('did not find ' + opts.cacheablePath + ' in cache, invoking real URL')
            var deferred = q.defer()
            var request = http.request(opts, function(response) {
                var body = ''
                response.on('data', function(chunk) {
                    body += chunk
                })
                response.on('end', function() {
                    deferred.resolve(body)
                })
            })
            request.end()
            logger.info('adding ' + opts.cacheablePath + ' to cache')
            cache[opts.cacheablePath] = deferred.promise
            setTimeout(function() {
                logger.info('clearing cache for path: ' + opts.cacheablePath)
                cache[opts.cacheablePath] = null
            }, args.cacheTimeout)
            return deferred.promise
        }
    }
} 