global.MODULES = __dirname + '/modules/';
global.requireLocal = function(modulePath) {
    return require(global.MODULES + modulePath)
}
var express = require('express')
var args = global.requireLocal('arguments/arguments')
var logger = global.requireLocal('logger/logger')

var miTiempo = express()

logger.info('Initializing miTiempo application')

var apiPathPrefix = '/api'
var weather = global.requireLocal('api/weather/weather')(miTiempo, apiPathPrefix)
var views = global.requireLocal('views/views')(miTiempo)

if (args.mocks) {
    global.requireLocal('mocks/mocks')(miTiempo)
}

logger.info('Initializing server on port ', args.port)

miTiempo.listen(args.port)