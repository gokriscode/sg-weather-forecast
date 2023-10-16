import { Controller, Get, Query } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
    constructor(private readonly serviceLogger: LoggerService) {}

    @Get("/recentsearch")
    getRecentRequests():any {
        return this.serviceLogger.getRecentRequests();
    }

    @Get("/topsearch")
    getTopRequests(@Query() query: {startTimestamp: number, endTimestamp: number}):any {
        return this.serviceLogger.getTopRequests(query.startTimestamp, query.endTimestamp);
    }

    @Get("/activehoursearch")
    getMostActiveHourRequests(@Query() query: {startTimestamp: number, endTimestamp: number}):any {
        return this.serviceLogger.getMostActiveHourPeriod(query.startTimestamp, query.endTimestamp);
    }

}
