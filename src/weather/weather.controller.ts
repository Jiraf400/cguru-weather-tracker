import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Request, Response } from 'express';
import { getWeatherDto } from './dto/get-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post('current_weather')
  async getCurrentWeather(@Req() req: Request, @Res() res: Response, @Body() dto: getWeatherDto) {
    if (!dto || !dto.apiToken || !dto.city) {
      return res.status(400).json({ error: 'All fields must be filled' });
    }

    const response = await this.weatherService.getCurrentWeather(dto);

    return res.status(200).json(response);
  }
}
