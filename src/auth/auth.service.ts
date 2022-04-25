import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
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
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: LoginDto) {
    const { username, password } = user;
    const userRec = await this.usersService.findOne(username);

    if (userRec && userRec.password === password) {
      const payload = {
        username: userRec.username,
        role: userRec.role,
      };
      return {
        access_token: this.jwtTokenService.sign(payload),
      };
    }

    return {
      message: 'Invalid username or password',
    };
  }
}
