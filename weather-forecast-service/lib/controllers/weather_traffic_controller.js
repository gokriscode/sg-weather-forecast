const { SendResponse, format_headers_body } = require('../../common/app_utils');
const { WeatherTrafficService } = require('../services/weather_traffic_service');
var debug = require('debug')('api:weatherTraffics:controllers');

var serviceWeatherTraffic = new WeatherTrafficService();

class WeatherTrafficController {

    getLocations(event, context) {
        debug("Get Locations")
        format_headers_body(event.headers, event.body)
            .then(function (response) {
                var date_time = event.queryParameters.date_time
                return serviceWeatherTraffic.getLocations(date_time)
            })
            .then(function(response){
                if(response.hasOwnProperty('status') && response.status == 404)
                    context.done(null, SendResponse(401, response))
                else{
                    debug("Controller response ", response)
                    context.done(null, SendResponse(200, response));
                }
            })
            .catch(function(err){
                debug("Get WeatherTraffics ", err)
                context.done(null, SendResponse(500, err));
            })
    }   
}


module.exports = {
    WeatherTrafficController
}