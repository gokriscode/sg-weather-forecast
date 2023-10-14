const geolib = require('geolib');

const {WeatherTrafficApiRepo} = require('../repositories/weather_traffic_api_repo');

var debug = require('debug')('api:weathertraffic:service');

var cache_locations_map = {
    data_for : null,
    locations: new Map()
}

function processWeatherData(searchdatetime, weatherData){
    return new Promise(async (resolve, reject) => {
        if (weatherData.hasOwnProperty("area_metadata")) {
            cache_locations_map.data_for = searchdatetime
            for(var idx = 0; idx<weatherData.area_metadata.length; idx++){
                var locationdata = weatherData.area_metadata[idx];
                debug("Location ", locationdata)
                cache_locations_map.locations.set(locationdata.name, {
                    name: locationdata.name,
                    latitude: locationdata.label_location.latitude,
                    longitude:locationdata.label_location.longitude
                })
            }
            for(var idx = 0; idx<weatherData.items[0].forecasts.length; idx++){
                var forecastdata = weatherData.items[0].forecasts[idx];
                debug("Forecast ", forecastdata)
                var locationdata = cache_locations_map.locations.get(forecastdata.area)
                cache_locations_map.locations.set(locationdata.name, {
                    ...locationdata,
                    forecast:forecastdata.forecast
                })
                
            }
            debug("Resolve called ", cache_locations_map.locations.size)
            resolve(cache_locations_map);
        }else{
            reject("Data not found");
        }
    })
}

function processImageData(imageData){
    return new Promise(async (resolve, reject) => {
        // imageData.items[0].cameras[0]
        if (imageData.hasOwnProperty("items")) {
            for(const [key, value] of cache_locations_map.locations.entries()){
                const maxDistance = 1000; //1 km 
                var targetLocation = {
                    latitude: value.latitude,
                    longitude: value.longitude,
                }
                debug("Location ", key, value, targetLocation)
                const nearbyLocations = imageData.items[0].cameras.filter(cameradata => {
                    const distance = geolib.getDistance(targetLocation, cameradata.location);
                    return distance <= maxDistance;
                  });

                  cache_locations_map.locations.set(key, {
                    ...value,
                    imagedata:nearbyLocations
                })

                  debug("nearbyLocations ",nearbyLocations)
            }
            resolve(cache_locations_map);
        }else{
            reject("Data not found");
        }
    })
}

function makeLocations(){
    return new Promise(async (resolve, reject) => {
        if (cache_locations_map.locations.size > 0) {
            var locationsResponse = []
            for(const [key, value] of cache_locations_map.locations.entries()){
                debug("Location ", key, value)
                locationsResponse.push(value)
            }
            debug("Resolve called ", locationsResponse)
            resolve(locationsResponse);
        }else{
            reject("LocationsMap Data not found", cache_locations_map.locations. size);
        }
    })
}

class WeatherTrafficService {
    getLocations(searchdatetime) {
        return new Promise(async (resolve, reject) => {
            try{
                debug("Get WeatherTraffics Function", searchdatetime)
                var apiRepoWeatherTraffic = new WeatherTrafficApiRepo();

                apiRepoWeatherTraffic.getWeatherData(searchdatetime)
                .then((resultInfo)=>{
                    return processWeatherData(searchdatetime, resultInfo)
                })
                .then((resultInfo)=>{
                    return apiRepoWeatherTraffic.getTrafficImages(searchdatetime)
                })
                .then((resulImageInfo)=>{
                    return processImageData(resulImageInfo)
                })
                .then(()=>{
                    return makeLocations()
                })
                .then((result)=>{                
                    debug("Locations ", result)
                    var res_locations = {
                        locations: result
                    }
                    return resolve(res_locations);
                })
                .catch((error) => {
                    // debug("GetWeatherTraffic ", error)
                    return reject(error);
                })
            }
            catch(error) {
                // debug("GetWeatherTraffic ", error)
                return reject(error);
            }
        })
    }
}

module.exports = {
    WeatherTrafficService
}