const geolib = require('geolib');

const {WeatherTrafficApiRepo} = require('../repositories/weather_traffic_api_repo');

var debug = require('debug')('api:weathertraffic:service');

var locationsMap = {
    data_for : null,
    locations: new Map()
}

class WeatherTrafficService {
    processWeatherData(searchdatetime, weatherData){
        return new Promise(async (resolve, reject) => {
            if (weatherData.hasOwnProperty("area_metadata")) {
                locationsMap.data_for = searchdatetime
                for(var idx = 0; idx<weatherData.area_metadata.length; idx++){
                    var locationdata = weatherData.area_metadata[idx];
                    debug("Location ", locationdata)
                    locationsMap.locations.set(locationdata.name, {
                        name: locationdata.name,
                        latitude: locationdata.label_location.latitude,
                        longitude:locationdata.label_location.longitude
                    })
                }
                for(var idx = 0; idx<weatherData.items[0].forecasts.length; idx++){
                    var forecastdata = weatherData.items[0].forecasts[idx];
                    debug("Forecast ", forecastdata)
                    var locationdata = locationsMap.locations.get(forecastdata.area)
                    locationsMap.locations.set(locationdata.name, {
                        ...locationdata,
                        forecast:forecastdata.forecast
                    })
                    
                }
                debug("Resolve called ", locationsMap.locations.size)
                resolve(locationsMap);
            }else{
                reject("Data not found");
            }
        })
    }

    processImageData(imageData){
        return new Promise(async (resolve, reject) => {
            // imageData.items[0].cameras[0]
            if (imageData.hasOwnProperty("items")) {
                for(const [key, value] of locationsMap.locations.entries()){
                    const maxDistance = 2000; //2 km 
                    var targetLocation = {
                        latitude: value.latitude,
                        longitude: value.longitude,
                    }
                    debug("Location ", key, value, targetLocation)
                    const nearbyLocations = imageData.items[0].cameras.filter(cameradata => {
                        const distance = geolib.getDistance(targetLocation, cameradata.location);
                        return distance <= maxDistance;
                      });

                      locationsMap.locations.set(key, {
                        ...value,
                        imagedata:nearbyLocations
                    })

                      debug("nearbyLocations ",nearbyLocations)
                }
                resolve(locationsMap);
            }else{
                reject("Data not found");
            }
        })
    }

    makeLocations(){
        return new Promise(async (resolve, reject) => {
            if (locationsMap.locations.size > 0) {
                var locationsResponse = []
                for(const [key, value] of locationsMap.locations.entries()){
                    debug("Location ", key, value)
                    locationsResponse.push(value)
                }
                debug("Resolve called ", locationsResponse)
                resolve(locationsResponse);
            }else{
                reject("LocationsMap Data not found", locationsMap.locations. size);
            }
        })
    }

    getLocations(searchdatetime) {
        return new Promise(async (resolve, reject) => {
            try{
                debug("Get WeatherTraffics Function", searchdatetime)
                var apiRepoWeatherTraffic = new WeatherTrafficApiRepo();

                apiRepoWeatherTraffic.getWeatherData(searchdatetime)
                .then((resultInfo)=>{
                    return this.processWeatherData(searchdatetime, resultInfo)
                })
                .then((resultInfo)=>{
                    return apiRepoWeatherTraffic.getTrafficImages(searchdatetime)
                })
                .then((resulImageInfo)=>{
                    return this.processImageData(resulImageInfo)
                })
                .then(()=>{
                    return this.makeLocations()
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