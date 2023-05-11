import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'find-all-students' })
  async findAllStudents() {
    return this.appService.findAllStudents();
  }

  @MessagePattern({ cmd: 'find-one-student' })
  async findOneStudent(id: number) {
    return this.appService.findOneStudent(id);
  }
}
