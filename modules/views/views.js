var express = require('express')
var logger = require('../logger/logger')

module.exports = function(application) {
    function bindEndpointToTemplate(endpoint, parameters) {
        var template = endpoint
        if (endpoint == '') {
            template = 'index'
        }
        application.get('/' + endpoint, function(request, response) {
            response.render(template + '.jade', parameters)
        })
    }

    logger.info('Binding CSS for views to /css folder')
    application.use('/css', express.static('css'))
    application.use('/font', express.static('font'))

    logger.info('Binding templates for views to /views folder')
    application.set('view engine', 'jade')
    bindEndpointToTemplate('', {title: 'miTiempo'})    
    bindEndpointToTemplate('hourly', {title: 'miTiempo - Domingo'})    
}