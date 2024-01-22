import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as process from 'process';
import { User } from './src/auth/user/user.entity';

config();

export default new DataSource({
  type: 'mysql',
  url: `${process.env.MYSQL_URL}`,
  migrations: ['migrations/**'],
  entities: [User]
});
