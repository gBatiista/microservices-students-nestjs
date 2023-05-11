import { CreateStudentDto } from './dto/create-student-dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateStudentDto } from './dto/update-student-dto';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/student')
  async createStudent(@Body() createDto: CreateStudentDto) {
    return this.appService.createStudent(createDto);
  }

  @Get('/student/:id')
  async findOneStudent(@Param('id') id: string) {
    return this.appService.findOneStudent(Number(id));
  }

  @Get('/student')
  async findAllStudents() {
    return this.appService.findAllStudents();
  }

  @Patch('/student/:id')
  async updateStudent(@Param('id') id: string, @Body() body: UpdateStudentDto) {
    const updateDto = {
      id: Number(id),
      ...body,
    };
    return this.appService.updateStudent(updateDto);
  }
}
