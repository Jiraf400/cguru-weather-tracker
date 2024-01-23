import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from 'src/shared/tokens/tokens.service';
import { User } from 'src/auth/user/user.entity';
import { Action } from './actions/action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Action])],
  controllers: [WeatherController],
  providers: [WeatherService, TokenService],
})
export class WeatherModule {}
