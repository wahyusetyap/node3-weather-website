const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f491d414cae5219cf34c65990625245a&query=${latitude},${longitude}&units=m`;

    request({url, json: true}, (error, response, body) => {
        const {temperature, feelslike} = body.current;

        if (error){
            callback('Unable to connect to service');
        } else if (body.error){
            callback('Unable to find the location');
        } else{
            const dataReturn = `it's currently ${temperature} degree, it feels like ${feelslike} degree outside.`
            callback(undefined, dataReturn);
        } 
    });
}

module.exports = forecast;