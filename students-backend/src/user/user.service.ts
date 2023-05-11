import { UpdateUserDto } from '../dto/update-user-dto';
import { CreateUserDto } from '../dto/create-user-dto';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER-ENGINE') private readonly userClient: ClientProxy,
  ) {}

  async createUser(data: CreateUserDto) {
    return this.userClient.send({ cmd: 'create-user' }, data);
  }

  async findOneUser(id: number) {
    return this.userClient.send({ cmd: 'find-one-user' }, id);
  }

  async findAllUsers() {
    return this.userClient.send({ cmd: 'find-all-users' }, {});
  }

  async updateUser(updateDto: UpdateUserDto) {
    return this.userClient.send({ cmd: 'update-user' }, updateDto);
  }

  async deleteUser(id: number) {
    return this.userClient.send({ cmd: 'delete-user' }, id);
  }

  async findUserToLogin(email: string) {
    return this.userClient.send({ cmd: 'find-user-to-login' }, email);
  }
}
