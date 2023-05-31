import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('delete-student')
  async deleteStudent(id: string) {
    return this.appService.deleteStudent(Number(id));
  }
}
