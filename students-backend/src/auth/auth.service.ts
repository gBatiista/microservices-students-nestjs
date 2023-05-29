import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findUserToLogin(email);

    const result = await firstValueFrom(user);

    const matchPassword = await bcrypt.compare(pass, result.password);

    if (!matchPassword) {
      throw new UnauthorizedException();
    }
    delete result.password;

    return { access_token: await this.jwtService.signAsync(result) };
  }
}
