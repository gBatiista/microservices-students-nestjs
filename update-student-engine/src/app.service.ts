import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async updateStudent({ id, ...data }) {
    const result = await this.prisma.student.update({
      where: { id },
      data,
    });

    return result;
  }
}
