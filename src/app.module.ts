import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './oauth/auth.module';
import { User } from './db/typeorm/entities/User';
import { ConfigModule } from '@nestjs/config';
import { TestOauthModule } from './test-oauth/test-oauth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'google_oauth2_app',
      entities: [User],
      synchronize: true,
    }),
    TestOauthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
