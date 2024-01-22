import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserRegisterDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async registerUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() userRegDto: UserRegisterDto
  ) {
    //TODO add user fields validation

    const response = await this.service.registerNewUser(userRegDto);

    return res.status(201).json({
      status: 'OK',
      message: 'Successfully register',
      body: response
    });
  }

  @Post('login')
  async loginUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() userLoginDto: UserLoginDto
  ) {
    //TODO add user fields validation

    const response = await this.service.loginUser(userLoginDto);

    return res.status(200).json({
      status: 'OK',
      message: 'Successfully login',
      body: response
    });
  }
}
