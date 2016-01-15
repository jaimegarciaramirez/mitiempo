var args = global.requireLocal('arguments/arguments')
var winston = require('winston')

/**
 * This is a custom logging module for use within the miTiempo application. 
 * The reason I wanted to do this is so that I can configure the winston logging
 * in one place and then other areas of my application can just invoke the 
 * 'logger' module without having to configure everything again. 
 */
console.log('Initializing logger with level', args.level)
winston.level = args.level
module.exports = winston