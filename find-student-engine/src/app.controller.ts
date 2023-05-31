import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('find-all-students')
  async findAllStudents() {
    return this.appService.findAllStudents();
  }

  @MessagePattern('find-one-student')
  async findOneStudent(id: string) {
    return this.appService.findOneStudent(Number(id));
  }
}
