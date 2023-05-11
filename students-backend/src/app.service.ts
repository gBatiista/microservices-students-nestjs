import { CreateStudentDto } from './dto/create-student-dto';
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

  async createStudent(student: CreateStudentDto) {
    const result = await this.createStudentClient.send(
      { cmd: 'create-student' },
      student,
    );

    return result;
  }
}
