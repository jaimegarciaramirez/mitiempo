var args = require('./modules/arguments/arguments')
var express = require('express')
var logger = require('./modules/logger/logger')
var miTiempo = express()

logger.info('Initializing miTiempo application')

var main = require('./modules/main')(miTiempo)

logger.info('Initializing server on port ', args.port)
miTiempo.listen(args.port)