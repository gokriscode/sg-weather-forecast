import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherTrafficModule } from './weather-traffic/weather-traffic.module';

@Module({
  imports: [WeatherTrafficModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
