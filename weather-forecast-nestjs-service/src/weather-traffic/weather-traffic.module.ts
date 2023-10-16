import { Module } from '@nestjs/common';
import { WeatherTrafficController } from './weather-traffic.controller';
import { WeatherTrafficService } from './weather-traffic.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [WeatherTrafficController],
  providers: [WeatherTrafficService]
})
export class WeatherTrafficModule {}
