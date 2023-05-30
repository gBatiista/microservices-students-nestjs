import { ClientKafka } from '@nestjs/microservices';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';

@Controller('login')
export class AuthController implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    @Inject('USER-ENGINE') private readonly userClient: ClientKafka,
  ) {}

  onModuleInit() {
    const listOfMessages = ['find-user-to-login'];

    listOfMessages.forEach(message => {
      this.userClient.subscribeToResponseOf(message);
    });
  }

  @Public()
  @Post()
  async signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
