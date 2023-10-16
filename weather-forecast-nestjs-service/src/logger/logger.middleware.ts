import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { parse } from 'query-params-helpers';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private readonly serviceLogger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Gets the request log
    console.log(`req:`, {
      headers: req.headers,
      body: req.body,
      originalUrl: req.originalUrl,
    });

    const parsed = parse(req.originalUrl);
    console.log("Query params ", parsed)

    this.serviceLogger.addRequest(parsed.date_time, parsed?.location_name)

    // Ends middleware function execution, hence allowing to move on 
    
    if (next) {
      next();
    }
  }
}