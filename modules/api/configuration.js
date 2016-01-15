var args = global.requireLocal('arguments/arguments')
var httpOptions  = {}
if (args.mocks) {
    httpOptions = {
        port: args.port,
        hostname: 'localhost'
    }
} else {
    httpOptions = {
        port: 80,
        hostname: 'api.openweathermap.org',
    }
}

module.exports = {
    options: httpOptions
}