import { Injectable } from '@nestjs/common';

const moment = require( "moment");

@Injectable()
export class AppService {
  getHealthStatus(): any {

    var today = new Date();
    var date = moment(today).utc().format("YYYY-MM-DD HH:mm:ss");
    var response = {
        "Service": "Weather Forecast & Traffic Cam",
        "Status": "Active",
        "Version": "v1.0.0",
        "Release Time": date,
        "Query Time": date
    }
    return response;
  }
}
