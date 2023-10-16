import { Injectable, Logger } from '@nestjs/common';
import { LoggerRepository } from './logger.repository';
import { debug } from 'console';

@Injectable()
export class LoggerService {

    repoLogger: LoggerRepository;

    onApplicationBootstrap() {
        debug("Logger Service Bootstrap")
        this.repoLogger = new LoggerRepository();
    }

    addRequest( date_time: string, location: string){
        debug("Search Request ", date_time, location)
        this.repoLogger.addRequest({ date_time: date_time, location: location, timestamp: Date.now() })
    }

    getRecentRequests(): any{
        return this.repoLogger.getRecentRequests();
    }

    getTopRequests(startTimestamp: number, endTimestamp: number): any{
        return this.repoLogger.getTopQueriesBetween(startTimestamp, endTimestamp);
    }

    getMostActiveHourPeriod(startTimestamp: number, endTimestamp: number): number | null {
        return this.repoLogger.findMostActiveHourPeriod(startTimestamp, endTimestamp);
    }

}
