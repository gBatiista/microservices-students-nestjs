import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findUserToLogin(email);

    const result = await user.toPromise();
    console.log(result);

    if (result?.password !== pass) {
      throw new UnauthorizedException();
    }
    delete result.password;

    return { access_token: await this.jwtService.signAsync(result) };
  }
}
