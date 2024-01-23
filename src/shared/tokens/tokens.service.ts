import * as process from 'process';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

const secret = `${process.env.API_TOKEN_SIGNATURE}`;

@Injectable()
export class TokenService {
  async generateApiToken() {
    return await bcrypt.hash(secret, 8);
  }
}
