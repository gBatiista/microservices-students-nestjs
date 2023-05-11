import { UpdateErrorInterceptor } from './interceptors/update.error.interceptor';
import { CreateStudentDto } from './dto/create-student-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateStudentDto } from './dto/update-student-dto';
import { CreateErrorInterceptor } from './interceptors/create.error.interceptor';
import { NotFoundErrorInterceptor } from './interceptors/notFound.error.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(new CreateErrorInterceptor())
  @Post('/student')
  async createStudent(@Body() createDto: CreateStudentDto) {
    return this.appService.createStudent(createDto);
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Get('/student/:id')
  async findOneStudent(@Param('id') id: string) {
    return this.appService.findOneStudent(Number(id));
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Get('/student')
  async findAllStudents() {
    return this.appService.findAllStudents();
  }

  @UseInterceptors(new UpdateErrorInterceptor())
  @Patch('/student/:id')
  async updateStudent(@Param('id') id: string, @Body() body: UpdateStudentDto) {
    const updateDto = {
      id: Number(id),
      ...body,
    };
    return this.appService.updateStudent(updateDto);
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Delete('/student/:id')
  async deleteStudent(@Param('id') id: string) {
    return this.appService.deleteStudent(Number(id));
  }
}
