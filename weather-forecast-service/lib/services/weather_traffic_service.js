const geolib = require('geolib');

const {WeatherTrafficApiRepo} = require('../repositories/weather_traffic_api_repo');

var debug = require('debug')('api:weathertraffic:service');

var cache_locations_map = new Map()

var cache_traffic_map = new Map()


function processWeatherData(searchdatetime, weatherData){
    return new Promise(async (resolve, reject) => {
        if (weatherData.hasOwnProperty("area_metadata")) {

            var locations_map = {
                data_for : null,
                locations: new Map()
            }
            
            locations_map.data_for = searchdatetime
            for(var idx = 0; idx<weatherData.area_metadata.length; idx++){
                var locationdata = weatherData.area_metadata[idx];
                debug("Location ", locationdata)
                locations_map.locations.set(locationdata.name, {
                    name: locationdata.name,
                    latitude: locationdata.label_location.latitude,
                    longitude:locationdata.label_location.longitude
                })
            }
            for(var idx = 0; idx<weatherData.items[0].forecasts.length; idx++){
                var forecastdata = weatherData.items[0].forecasts[idx];
                debug("Forecast ", forecastdata)
                var locationdata = locations_map.locations.get(forecastdata.area)
                locations_map.locations.set(locationdata.name, {
                    ...locationdata,
                    forecast:forecastdata.forecast
                })
                
            }
            debug("Resolve called ", locations_map.locations.size)
            cache_locations_map.set(searchdatetime, locations_map)
            resolve(locations_map);
        }else{
            reject("Data not found");
        }
    })
}

function processTrafficImageData(searchdatetime, imageData){
    return new Promise(async (resolve, reject) => {
        if (imageData.hasOwnProperty("items")) {
            debug("Process Traffic Images ", imageData.items[0].cameras.length)
            var traffic_map = {
                data_for :searchdatetime,
                traffic_images: imageData.items[0].cameras
            }
            cache_traffic_map.set(searchdatetime, traffic_map)

            resolve(traffic_map.traffic_images)
        }else{
            reject("Traffic Images not found");
        }
    })
}

function getLocationTrafficImages(locations_map, location_name, traffic_images){
    return new Promise(async (resolve, reject) => {
        debug("Get Location Images, Locations ",  location_name, locations_map.locations.size)
        var locationInfo = locations_map.locations.get(location_name);
        debug("Location data ", locationInfo)
        if(locationInfo){
            const maxDistance = 1000; //1 km 
            var targetLocation = {
                latitude: locationInfo.latitude,
                longitude: locationInfo.longitude,
            }
            debug("Location ", targetLocation)
            const nearbyLocations = traffic_images.filter(cameradata => {
                const distance = geolib.getDistance(targetLocation, cameradata.location);
                return distance <= maxDistance;
                });

            locationInfo = {
                ...locationInfo,
                imagedata:nearbyLocations
                }
            debug("nearbyLocations ",locationInfo)
            resolve(locationInfo);
        }else{
            reject("Location Data Not Found");
        }
    })
}


function buildLocations(locations_map){
    return new Promise(async (resolve, reject) => {
        if (locations_map.locations.size > 0) {
            var locationsResponse = []
            for(const [key, value] of locations_map.locations.entries()){
                locationsResponse.push(value)
            }
            debug("Build locations ", locationsResponse.length)
            resolve(locationsResponse);
        }else{
            reject("LocationsMap Data not found", locations_map.locations. size);
        }
    })
}

function getWeatherData(searchdatetime){
    return new Promise(async (resolve, reject) => {
        debug("Get Weather Data ")

        var cache_data = cache_locations_map.get(searchdatetime)

        // Load from Cache
        if(cache_data){
            debug("Locations from Cache")
            return resolve(cache_data);
        }else{
            // Not found in cache, load from API
            var apiRepoWeatherTraffic = new WeatherTrafficApiRepo();
            apiRepoWeatherTraffic.getWeatherData(searchdatetime)
            .then((resultInfo)=>{
                return processWeatherData(searchdatetime, resultInfo)
            })
            .then((locations_map)=>{
                return resolve(locations_map);
            })
        }
    })
}


function getTrafficImageData(searchdatetime){
    return new Promise(async (resolve, reject) => {
        debug("Get Traffic Data ")

        var cache_data = cache_traffic_map.get(searchdatetime)
        
        // Load from Cache
        if(cache_data){
            debug("Traffic  from Cache", cache_data.data_for)
            return resolve(cache_data.traffic_images);
        }else{
            // Not found in cache, load from API
            var apiRepoWeatherTraffic = new WeatherTrafficApiRepo();          
            apiRepoWeatherTraffic.getTrafficImages(searchdatetime)
            .then((resulImageInfo)=>{
                debug("Traffic Images ", resulImageInfo.length)
                return processTrafficImageData(searchdatetime, resulImageInfo)
            })
            .then((traffic_images)=>{
                return resolve(traffic_images);
            })
        }
    })
}

class WeatherTrafficService {
    getLocations(searchdatetime) {
        return new Promise(async (resolve, reject) => {
            try{
                debug("Get WeatherTraffics Function", searchdatetime)
                getWeatherData(searchdatetime)
                .then((locations_map)=>{
                    debug("Locations Map ", locations_map.data_for)
                    return buildLocations(locations_map)
                })
                .then((result)=>{                
                    debug("Locations ", result.length)
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

    getTrafficImages(searchdatetime, location_name) {
        return new Promise(async (resolve, reject) => {
            try{
                debug("Get TrafficImages Function", searchdatetime, location_name)
              
                getTrafficImageData(searchdatetime)
                .then(async (traffic_images)=>{
                    debug("Traffic Images ", traffic_images.length)
                    var locations_map = await getWeatherData(searchdatetime)
                    return {
                        traffic_images :traffic_images, 
                        locations_map: locations_map
                    }
                })
                .then((retval)=>{
                    debug("Locations & Images Loaded ")
                    return getLocationTrafficImages(retval.locations_map, location_name, retval.traffic_images)
                })
                .then((res_location)=>{
                    return resolve(res_location);
                })
                .catch((error) =>{
                    // debug("GetWeatherTraffic ", error)
                    return reject(error);
                });
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