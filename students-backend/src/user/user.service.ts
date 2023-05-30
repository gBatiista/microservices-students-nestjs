import { UpdateUserDto } from '../dto/update-user-dto';
import { CreateUserDto } from '../dto/create-user-dto';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER-ENGINE') private readonly userClient: ClientKafka,
  ) {}

  async createUser(data: CreateUserDto) {
    return this.userClient.send('create-user', data);
  }

  async findOneUser(id: string) {
    return this.userClient.send('find-one-user', id);
  }

  async findAllUsers() {
    return this.userClient.send('find-all-users', {});
  }

  async updateUser(updateDto: UpdateUserDto) {
    return this.userClient.send('update-user', updateDto);
  }

  async deleteUser(id: string) {
    return this.userClient.send('delete-user', id);
  }

  async findUserToLogin(email: string) {
    return this.userClient.send('find-user-to-login', email);
  }
}
