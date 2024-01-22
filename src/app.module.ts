import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import * as process from 'process';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user/user.entity';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: `${process.env.MYSQL_URL}`,
      autoLoadEntities: true,
      synchronize: false,
      entities: [User]
    })
  ]
})
export class AppModule {}
