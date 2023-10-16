import { HttpService } from '@nestjs/axios';
import { ForbiddenException } from '@nestjs/common';
import { debug } from 'console';
import { map, catchError } from 'rxjs';

export class WeatherTrafficRepository {

    cache_locations_map : any
    cache_traffic_map : any


    constructor(private http: HttpService) {
        this.cache_locations_map = new Map();
        this.cache_traffic_map = new Map();
    }

    async getLocations(date_time:string):Promise<any> {

        return new Promise(async(resolve, reject) => {
            let locations_map = this.cache_locations_map.get(date_time);
            if(locations_map){
                debug("Get Locations Data from Cache, Date time", date_time)
                resolve(locations_map);
            }else{
                debug("Get Locations Data from Server, Date time", date_time)
                let resquest = this.http
                    .get(process.env.GOV_DATA_URL+ '/environment/2-hour-weather-forecast?date_time='+date_time)
                    .pipe(
                    map((res) => {
                        this.cache_locations_map.set(date_time, res.data);
                        return res.data
                    }),
                    )
                    .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }),
                    );
                resquest.subscribe((data: any)=>{
                    resolve(data);
                })
            }
        });

    }

    async getTrafficImages(date_time:string):Promise<any>{

        return new Promise(async(resolve, reject) => {
        let traffic_map = this.cache_traffic_map.get(date_time);
        if(traffic_map){
            debug("Get Traffic Image Data from Cache, Date time", date_time)
            resolve(traffic_map);
        }else{
            debug("Get Traffic Image Data from Server, Date time", date_time, process.env.GOV_DATA_URL+ '/transport/traffic-images?date_time='+date_time)
           
            let resquest = this.http
            .get(process.env.GOV_DATA_URL+ '/transport/traffic-images?date_time='+date_time)
                .pipe(
                map((res) => {
                    this.cache_traffic_map.set(date_time, res.data);
                    return res.data
                }),
                )
                .pipe(
                catchError(() => {
                    throw new ForbiddenException('API not available');
                }),
                );
            resquest.subscribe((data: any)=>{
                debug("Data received ", data)
                resolve(data);
            })
        }
     }
    );
    }
}
