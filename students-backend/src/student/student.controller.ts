import { UpdateErrorInterceptor } from '../interceptors/update.error.interceptor';
import { CreateStudentDto } from '../dto/create-student-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateStudentDto } from '../dto/update-student-dto';
import { CreateErrorInterceptor } from '../interceptors/create.error.interceptor';
import { NotFoundErrorInterceptor } from '../interceptors/notFound.error.interceptor';
import { StudentService } from './student.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller('/student')
export class StudentController implements OnModuleInit {
  constructor(
    private readonly studentService: StudentService,
    @Inject('CREATE-STUDENT') private readonly createStudentClient: ClientKafka,
    @Inject('FIND-STUDENT') private readonly findStudentClient: ClientKafka,
    @Inject('UPDATE-STUDENT') private readonly updateStudentClient: ClientKafka,
    @Inject('DELETE-STUDENT') private readonly deleteStudentClient: ClientKafka,
  ) {}

  onModuleInit() {
    const listOfFindMessages = ['find-all-students', 'find-one-student'];

    listOfFindMessages.forEach(message => {
      this.findStudentClient.subscribeToResponseOf(message);
    });

    this.createStudentClient.subscribeToResponseOf('create-student');
    this.updateStudentClient.subscribeToResponseOf('update-student');
    this.deleteStudentClient.subscribeToResponseOf('delete-student');
  }

  @UseInterceptors(new CreateErrorInterceptor())
  @Post('')
  async createStudent(@Body() createDto: CreateStudentDto) {
    return this.studentService.createStudent(createDto);
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Get('/:id')
  async findOneStudent(@Param('id') id: string) {
    return this.studentService.findOneStudent(id);
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
    return this.studentService.deleteStudent(id);
  }
}
