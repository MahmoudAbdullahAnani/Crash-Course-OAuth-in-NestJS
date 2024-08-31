import { Module } from '@nestjs/common';
import { ClientHomePage, TestOauthController } from './test-oauth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TestOauthController, ClientHomePage],
  providers: [GoogleStrategy, AuthService],
})
export class TestOauthModule {}
