import { UpdateErrorInterceptor } from '../interceptors/update.error.interceptor';
import { CreateStudentDto } from '../dto/create-student-dto';
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
import { UpdateStudentDto } from '../dto/update-student-dto';
import { CreateErrorInterceptor } from '../interceptors/create.error.interceptor';
import { NotFoundErrorInterceptor } from '../interceptors/notFound.error.interceptor';
import { StudentService } from './student.service';

@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseInterceptors(new CreateErrorInterceptor())
  @Post('')
  async createStudent(@Body() createDto: CreateStudentDto) {
    return this.studentService.createStudent(createDto);
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Get('/:id')
  async findOneStudent(@Param('id') id: string) {
    return this.studentService.findOneStudent(Number(id));
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Get('')
  async findAllStudents() {
    return this.studentService.findAllStudents();
  }

  @UseInterceptors(new UpdateErrorInterceptor())
  @Patch('/:id')
  async updateStudent(@Param('id') id: string, @Body() body: UpdateStudentDto) {
    const updateDto = {
      id: Number(id),
      ...body,
    };
    return this.studentService.updateStudent(updateDto);
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Delete('/:id')
  async deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(Number(id));
  }
}
