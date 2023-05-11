import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async findAllStudents() {
    const result = await this.prisma.student.findMany();

    return result;
  }

  async findOneStudent(id: number) {
    const result = await this.prisma.student.findUnique({ where: { id } });

    return result;
  }
}
