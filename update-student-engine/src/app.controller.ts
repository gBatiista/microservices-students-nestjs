import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'update-student' })
  async updateStudent(updateDto) {
    return this.appService.updateStudent(updateDto);
  }
}
