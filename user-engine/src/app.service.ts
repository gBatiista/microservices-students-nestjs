import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(data: CreateUserDto) {
    const hash = await bcrypt.hash(data.password, 10);

    const dataWithHashPassword = { ...data, password: hash };

    const result = await this.prisma.user.create({
      data: dataWithHashPassword,
    });

    delete result.password;
    return result;
  }

  async findOneUser(id: number) {
    const result = await this.prisma.user.findUnique({ where: { id } });

    if (!result) throw new RpcException('Not Found');

    delete result.password;

    return result;
  }

  async findAllUsers() {
    const result = await this.prisma.user.findMany();

    if (result.length === 0) throw new RpcException('Not Found');

    result.forEach((user) => {
      delete user.password;
    });

    return result;
  }

  async updateUser({ id, ...data }) {
    const hash = await bcrypt.hash(data.password, 10);

    const dataWithHashPassword = { ...data, password: hash };
    const result = await this.prisma.user.update({
      where: { id },
      data: dataWithHashPassword,
    });

    delete result.password;

    return result;
  }

  async deleteUser(id: number) {
    const result = await this.prisma.user.delete({
      where: { id },
    });

    delete result.password;

    return result;
  }

  async findUserToLogin(email: string) {
    const result = await this.prisma.user.findUnique({ where: { email } });

    return result;
  }
}
