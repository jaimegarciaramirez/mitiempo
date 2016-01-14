var commandLineArgs = require('command-line-args')

var cli = commandLineArgs([
    { name: 'port', alias: 'p', type: Number, defaultValue: 3000 },
    { name: 'level', alias: 'l', type: String, defaultValue: 'debug' }
])

var options = {}
try {
    options = cli.parse()
} catch (e) {
    console.error('Failed to parse command line arguments', cli.getUsage())
    cli.getUsage()
}
// Why are we not using a logger? Simple, becuase we command line
// arguments are executed first, and we won't know what the logging
// level will be yet
console.log('Initiating miTiempo with command line arguments:', options)

module.exports = options