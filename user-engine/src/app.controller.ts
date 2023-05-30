import { CreateUserDto } from './dto/create-user-dto';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create-user')
  async createUser(data: CreateUserDto) {
    return this.appService.createUser(data);
  }

  @MessagePattern('find-one-user')
  async findOneUser(id: string) {
    return this.appService.findOneUser(Number(id));
  }

  @MessagePattern('find-all-users')
  async findAllUsers() {
    return this.appService.findAllUsers();
  }

  @MessagePattern('update-user')
  async updateUser(updateDto: UpdateUserDto & { id: number }) {
    return this.appService.updateUser(updateDto);
  }

  @MessagePattern('delete-user')
  async deleteUser(id: string) {
    return this.appService.deleteUser(Number(id));
  }

  @MessagePattern('find-user-to-login')
  async findUserToLogin(email: string) {
    return this.appService.findUserToLogin(email);
  }
}
