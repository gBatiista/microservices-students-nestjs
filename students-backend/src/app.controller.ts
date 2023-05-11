import { CreateStudentDto } from './dto/create-student-dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/student')
  async reateStudent(@Body() student: CreateStudentDto) {
    return this.appService.createStudent(student);
  }
}
