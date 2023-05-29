import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async findAllStudents() {
    const result = await this.prisma.student.findMany();

    if (result.length === 0) throw new RpcException('Not Found');
    console.log();
    return result;
  }

  async findOneStudent(id: number) {
    const result = await this.prisma.student.findUnique({ where: { id } });

    if (!result) throw new RpcException('Not Found');

    return result;
  }
}
