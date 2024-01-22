import { User } from '../user/user.entity';
import { UserRegisterDto } from './register-user.dto';

export function mapRegisterDtoToUser(dto: UserRegisterDto, apiToken: string): User {
  const user = new User();
  user.login = dto.login;
  user.fio = dto.fio;
  user.password = dto.password;
  user.apiToken = apiToken;
  return user;
}
