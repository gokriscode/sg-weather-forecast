const {WeatherTrafficApiRepo} = require('../weather_traffic_api_repo');

var debug = require('debug')('api:repository:testbed');

async function main() {
    debug("Main called")
    var apiRepoWeatherTraffic = new WeatherTrafficApiRepo();
    
    apiRepoWeatherTraffic.getWeatherData("2023-10-12T12:00:00")
    .then((weatherData)=>{
        // debug("Weather Data ", weatherData.area_metadata[0])
        // debug("Weather Data ", weatherData.items[0].forecasts)
        return apiRepoWeatherTraffic.getTrafficImages("2023-10-12T12:00:00")
    })
    .then((trafficImages)=>{
        debug("Traffic Data ", trafficImages.items[0].cameras[0])
    })
    .catch(async (err)=>{
        debug("Error ", err)
    })
  }
  
  main();