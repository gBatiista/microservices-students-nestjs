import { CreateStudentDto } from '../dto/create-student-dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UpdateStudentDto } from '../dto/update-student-dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject('CREATE-STUDENT') private readonly createStudentClient: ClientKafka,
    @Inject('FIND-STUDENT') private readonly findStudentClient: ClientKafka,
    @Inject('UPDATE-STUDENT') private readonly updateStudentClient: ClientKafka,
    @Inject('DELETE-STUDENT') private readonly deleteStudentClient: ClientKafka,
  ) {}

  async createStudent(createDto: CreateStudentDto) {
    const result = await this.createStudentClient.send(
      'create-student',
      createDto,
    );

    return result;
  }

  async findAllStudents() {
    const result = await this.findStudentClient.send('find-all-students', {});

    return result;
  }

  async findOneStudent(id: string) {
    const result = await this.findStudentClient.send('find-one-student', id);

    return result;
  }

  async updateStudent(updateDto: UpdateStudentDto) {
    const result = await this.updateStudentClient.send(
      'update-student',
      updateDto,
    );

    return result;
  }

  async deleteStudent(id: string) {
    const result = await this.deleteStudentClient.send('delete-student', id);
    return result;
  }
}
