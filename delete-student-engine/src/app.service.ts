import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async deleteStudent(id: number) {
    const result = await this.prisma.student.delete({ where: { id } });

    return result;
  }
}
