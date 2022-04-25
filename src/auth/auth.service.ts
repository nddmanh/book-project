import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) return null;
    const isPasswordMatching = await argon2.verify(user.password, password);
    if (isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    try {
      const { username, password } = user;
      const userRec = await this.usersService.findOne(username);
      if (!userRec) {
        return {
          message: 'Invalid username or password',
        };
      }
      const isPasswordMatching = await argon2.verify(
        userRec.password,
        password,
      );
      if (!isPasswordMatching) {
        return {
          message: 'Invalid username or password',
        };
      }
      const payload = {
        username: userRec.username,
        role: userRec.role,
      };
      return {
        access_token: this.jwtTokenService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
