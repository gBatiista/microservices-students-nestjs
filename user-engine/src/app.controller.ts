import { CreateUserDto } from './dto/create-user-dto';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create-user' })
  async createUser(data: CreateUserDto) {
    return this.appService.createUser(data);
  }

  @MessagePattern({ cmd: 'find-one-user' })
  async findOneUser(id: number) {
    return this.appService.findOneUser(id);
  }

  @MessagePattern({ cmd: 'find-all-users' })
  async findAllUsers() {
    return this.appService.findAllUsers();
  }

  @MessagePattern({ cmd: 'update-user' })
  async updateUser(updateDto: UpdateUserDto & { id: number }) {
    return this.appService.updateUser(updateDto);
  }

  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser(id: number) {
    return this.appService.deleteUser(id);
  }

  @MessagePattern({ cmd: 'find-user-to-login' })
  async findUserToLogin(email: string) {
    return this.appService.findUserToLogin(email);
  }
}
