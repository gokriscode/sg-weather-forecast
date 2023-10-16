import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherTrafficModule } from './weather-traffic/weather-traffic.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
import { LoggerController } from './logger/logger.controller';

@Module({
  imports: [ConfigModule.forRoot(), WeatherTrafficModule, LoggerModule],
  controllers: [AppController, LoggerController],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/api/weather-traffic/*', method: RequestMethod.ALL });
  }
}
