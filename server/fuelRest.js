/**
 * Created with JetBrains WebStorm.
 * User: jill
 * Date: 4/21/14
 * Time: 12:32 AM
 * To change this template use File | Settings | File Templates.
 */


// Load and configure Fuel module to get token for Fuel REST calls

var fuel = require('fuel').configure({
    authUrl: 'https://auth.exacttargetapis.com/v1/requestToken',
    clientId: '',
    clientSecret: ''
});


module.exports = {

    getTokenContext: function( callback ){

        console.log('get token context')
        fuel({
            url: 'https://www.exacttargetapis.com/platform/v1/tokenContext'
        }, function (error, request, body) {
            console.log(body);
        });
    }
}