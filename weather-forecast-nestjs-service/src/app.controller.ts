import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("")
export class AppController {
  constructor(private readonly serviceApp: AppService) {}

  @Get("heartbeat")
  getHeartBeat(): any {
    return this.serviceApp.getHealthStatus();
  }
}
