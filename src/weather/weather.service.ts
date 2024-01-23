import { HttpException, Injectable } from '@nestjs/common';
import { getWeatherDto } from './dto/get-weather.dto';
import { TokenService } from 'src/shared/tokens/tokens.service';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user/user.entity';
import { Repository } from 'typeorm';
import * as process from 'process';
import { config } from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import { Action } from './actions/action.entity';

config();

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Action)
    private actionRepository: Repository<Action>,
  ) {}

  async getCurrentWeather(dto: getWeatherDto) {
    const apiToken = dto.apiToken;
    const API_KEY = `${process.env.WEATHER_API_KEY}`;

    const user = await this.userRepository.findOneBy({ apiToken: apiToken });

    if (!user) {
      throw new HttpException('User not exists', 400);
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${dto.city}`;

    let data: AxiosResponse;

    try {
      data = await axios.get(url, { responseType: 'json' });
    } catch (error: any) {
      console.error(error.message);

      const action = new Action();
      action.user = user;
      action.request_result = 500;
      action.temp_c = null;
      action.actionTime = new Date();

      await this.actionRepository.save(action);

      throw new HttpException('Cannot send response', 500);
    }

    const temp_c = data.data.current.feelslike_c;

    console.log(`Temp in ${dto.city}: ${temp_c}`);

    const action = new Action();
    action.user = user;
    action.request_result = 200;
    action.temp_c = temp_c;
    action.actionTime = new Date();

    await this.actionRepository.save(action);

    return data.data;
  }
}
