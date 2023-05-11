import { CreateStudentDto } from './dto/create-student-dto';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create-student' })
  async createStudent(student: CreateStudentDto) {
    return this.appService.createStudent(student);
  }
}
