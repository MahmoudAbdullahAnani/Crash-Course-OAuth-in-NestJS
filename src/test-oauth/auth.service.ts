import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/typeorm/entities/User';
import { Repository } from 'typeorm';

type UserData = {
  userId: string;
  email: string;
  name: string;
  photo: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async validateUser(userData: UserData): Promise<any> {
    console.time('AuthService');
    const user = await this.userRepository.findOneBy({
      email: userData.email,
    });
    console.timeEnd('AuthService');
    if (user) return user;
    console.log('User not found. Creating...');
    const newUser = this.userRepository.create({
      email: userData.email,
      displayName: userData.name,
    });
    return this.userRepository.save(newUser);
  }
}
