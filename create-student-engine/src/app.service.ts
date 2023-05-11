import { CreateStudentDto } from './dto/create-student-dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(student: CreateStudentDto) {
    const created = await this.prisma.student.create({ data: student });

    return created;
  }
}
