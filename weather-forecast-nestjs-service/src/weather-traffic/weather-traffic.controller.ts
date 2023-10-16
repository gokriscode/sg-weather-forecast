import { Controller, Get, Query } from '@nestjs/common';
import { debug } from 'console';
import { WeatherTrafficService } from './weather-traffic.service';

@Controller('api/weather-traffic')
export class WeatherTrafficController {

    constructor(private readonly serviceWeatherTraffic: WeatherTrafficService) {}

    @Get("locations")
    getLocations(@Query() query:{date_time:string}):any {
        return this.serviceWeatherTraffic.getLocations(query.date_time);
    }


    @Get("trafficimages")
    getTrafficImages(@Query() query: {date_time:string, location_name:string}):any{
       return this.serviceWeatherTraffic.getTrafficImages(query.date_time, query.location_name);
    }
}
