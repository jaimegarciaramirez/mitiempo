var args = require('./modules/arguments/arguments')
var express = require('express')
var logger = require('./modules/logger/logger')
var miTiempo = express()

logger.info('Initializing miTiempo application')

var apiPathPrefix = '/api'
var main = require('./modules/main')(miTiempo, apiPathPrefix)
var weather = require('./modules/weather/weather')(miTiempo, apiPathPrefix)
var views = require('./modules/views/views')(miTiempo)

logger.info('Initializing server on port ', args.port)

miTiempo.listen(args.port)