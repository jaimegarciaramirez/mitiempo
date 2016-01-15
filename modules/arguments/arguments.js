var commandLineArgs = require('command-line-args')

var cli = commandLineArgs([
    { name: 'port', alias: 'p', type: Number, defaultValue: 3000 },
    { name: 'level', alias: 'l', type: String, defaultValue: 'debug' },
    { name: 'cacheTimeout', alias: 't', type: Number, defaultValue: 20000 },
    { name: 'mocks', alias: 'm', type: Boolean, defaultValue: false}
])

var options = {}
try {
    options = cli.parse()
} catch (e) {
    console.error('Failed to parse command line arguments', cli.getUsage())
    cli.getUsage()
    process.exit()
}

if (process.env.WEATHER_API_KEY == undefined) {    
    console.error('Weather API key is not provided, you need to provide this as ' + 
    'part of the WEATHER_API_KEY environment variable')
    process.exit()
} 

// Why are we not using a logger? Simple, becuase we command line
// arguments are executed first, and we won't know what the logging
// level will be yet
console.log('Initiating miTiempo with command line arguments:', options)

// we add this later so it does not get logged, we don't want this logged :)
options.WEATHER_API_KEY = process.env.WEATHER_API_KEY

module.exports = options