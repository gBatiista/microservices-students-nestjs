import { CreateStudentDto } from '../dto/create-student-dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateStudentDto } from '../dto/update-student-dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject('CREATE-STUDENT') private readonly createStudentClient: ClientProxy,
    @Inject('FIND-STUDENT') private readonly findStudentClient: ClientProxy,
    @Inject('UPDATE-STUDENT') private readonly updateStudentClient: ClientProxy,
    @Inject('DELETE-STUDENT') private readonly deleteStudentClient: ClientProxy,
  ) {}

  async createStudent(createDto: CreateStudentDto) {
    const result = await this.createStudentClient.send(
      { cmd: 'create-student' },
      createDto,
    );

    return result;
  }

  async findAllStudents() {
    const result = await this.findStudentClient.send(
      { cmd: 'find-all-students' },
      {},
    );

    return result;
  }

  async findOneStudent(id: number) {
    const result = await this.findStudentClient.send(
      { cmd: 'find-one-student' },
      id,
    );

    return result;
  }

  async updateStudent(updateDto: UpdateStudentDto) {
    const result = await this.updateStudentClient.send(
      { cmd: 'update-student' },
      updateDto,
    );

    return result;
  }

  async deleteStudent(id: number) {
    const result = await this.deleteStudentClient.send(
      { cmd: 'delete-student' },
      id,
    );
    return result;
  }
}
