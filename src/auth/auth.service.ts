import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  registerNewUser(userRegDto: UserRegisterDto) {
    //проверить, что такого юзера нет в бд
    //создать юзера
    //выдать ответ
  }
  loginUser(userRegDto: UserLoginDto) {
    //проверить, что такой юзер есть в бд
    //сформировать токен
    //выдать ответ
  }
}
