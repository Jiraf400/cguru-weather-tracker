import { HttpException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';
import { mapRegisterDtoToUser } from './dto/dto-mapper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerNewUser(userRegDto: UserRegisterDto) {
    const duplicate = await this.userRepository.findOneBy({
      login: userRegDto.login,
    });

    if (duplicate) {
      throw new HttpException('User already exists', 400);
    }

    userRegDto.password = await this.hashPassword(userRegDto.password);

    //TODO: generate apiToken

    const apiToken = 'someToken';

    const user = mapRegisterDtoToUser(userRegDto, apiToken);

    console.log(JSON.stringify(user));

    const saved = await this.userRepository.save(user);

    return saved;
  }

  async loginUser(userLoginDto: UserLoginDto) {
    const user = await this.userRepository.findOneBy({
      login: userLoginDto.login,
    });

    if (!user) {
      throw new HttpException('User not exists', 400);
    }

    const match = await this.arePasswordsEqual(user.password, userLoginDto.password);

    if (!match) {
      throw new HttpException('Authorization failed', 401);
    }

    //TODO: generate new apiToken

    const apiToken = `token`;

    user.apiToken = apiToken;

    return { fio: user.fio, apiToken: apiToken };
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }

  async arePasswordsEqual(userPassword: string, dtoPassword: string) {
    return await bcrypt.compare(dtoPassword, userPassword);
  }
}
