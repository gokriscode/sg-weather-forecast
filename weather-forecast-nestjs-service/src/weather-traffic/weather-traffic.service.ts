import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { debug } from 'console';
import { WeatherTrafficRepository } from './weather-traffic.repository';
import { HttpService } from '@nestjs/axios';

const geolib = require('geolib');

@Injectable()
export class WeatherTrafficService {

    constructor(private readonly http: HttpService) {}

    repoWeatherTraffic: WeatherTrafficRepository;

    onApplicationBootstrap() {
        debug("Weather Traffic Repoistory Bootstrap")
        this.repoWeatherTraffic = new WeatherTrafficRepository(this.http);
    }

    getLocations(date_time:string):any {
        return this.repoWeatherTraffic.getLocations(date_time)
        .then((weatherData : any)=>{
            debug("Service Data received ", weatherData)
          
            let locations = new Map()

            for(var idx = 0; idx<weatherData['area_metadata'].length; idx++){
                var locationdata = weatherData['area_metadata'][idx];
                debug("Location ", locationdata)
                locations.set(locationdata.name, {
                    name: locationdata.name,
                    latitude: locationdata.label_location.latitude,
                    longitude:locationdata.label_location.longitude
                })
            }
            for(var idx = 0; idx<weatherData['items'][0].forecasts.length; idx++){
                var forecastdata = weatherData['items'][0].forecasts[idx];
                debug("Forecast ", forecastdata)
                var locationdata = locations.get(forecastdata.area)
                locations.set(locationdata.name, {
                    ...locationdata,
                    forecast:forecastdata.forecast
                })
                
            }

            var locationsResponse = []
            for(const [key, value] of locations.entries()){
                locationsResponse.push(value)
            }

            debug("Return locations data ", locationsResponse)
            return  {
                locations: locationsResponse
            }
        })

    }

    getTrafficImages(date_time:string, location_name:string):any{

        return this.repoWeatherTraffic.getTrafficImages(date_time)
        .then(async (trafficData : any)=>{
            return {
                trafficData : trafficData,
                weatherData :await this.repoWeatherTraffic.getLocations(date_time)
            }
        })
        .then((dataTrafficLocation : any)=>{
            let dataTrafficImages = null

            for(var idx = 0; idx<dataTrafficLocation.weatherData['area_metadata'].length; idx++){
                var dataLocation = dataTrafficLocation.weatherData['area_metadata'][idx];
                if(location_name == dataLocation.name){
                    dataTrafficImages = {
                        name: dataLocation.name,
                        latitude: dataLocation.label_location.latitude,
                        longitude:dataLocation.label_location.longitude
                    }
                    break;
                }
            }
            if(dataTrafficImages){
                const maxDistance = 1000; //1 km 
                var targetLocation = {
                    latitude: dataTrafficImages.latitude,
                    longitude: dataTrafficImages.longitude,
                }
                const nearbyLocations = dataTrafficLocation!.trafficData!.items[0].cameras.filter((cameradata:any) => {
                    const distance = geolib.getDistance(targetLocation, cameradata.location);
                    return distance <= maxDistance;
                    });
    
                dataTrafficImages = {
                    ...dataTrafficImages,
                    imagedata:nearbyLocations
                }
                debug("nearbyLocations ",nearbyLocations)
                debug("Return Traffic data ", dataTrafficImages)
                return  dataTrafficImages;
            }else{
                throw new NotFoundException('Traffic data not found');
            }
        })
        ;
    }
}
