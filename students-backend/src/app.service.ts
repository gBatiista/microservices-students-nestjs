import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('CREATE-STUDENT') private readonly createStudentClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getStudent() {
    console.log('chegou no service');
    return this.createStudentClient.send({ cmd: 'hello' }, {});
  }
}
