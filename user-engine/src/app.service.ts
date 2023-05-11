import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(data: CreateUserDto) {
    const result = await this.prisma.user.create({
      data,
    });

    return result;
  }

  async findOneUser(id: number) {
    const result = await this.prisma.user.findUnique({ where: { id } });

    return result;
  }

  async findAllUsers() {
    const result = await this.prisma.user.findMany();

    return result;
  }

  async updateUser({ id, ...data }) {
    const result = await this.prisma.user.update({
      where: { id },
      data,
    });

    return result;
  }

  async deleteUser(id: number) {
    const result = await this.prisma.user.delete({
      where: { id },
    });

    return result;
  }

  async findUserToLogin(email: string) {
    const result = await this.prisma.user.findUnique({ where: { email } });

    // if (!result) throw new RpcException('Not Found');
    // if (result.password !== password) throw new RpcException('Unauthorized');

    return result;
  }
}
