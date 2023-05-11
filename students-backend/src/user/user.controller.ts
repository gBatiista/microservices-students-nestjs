import { UpdateUserDto } from './../dto/update-user-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user-dto';
import { UserService } from './user.service';
import { Public } from 'src/auth/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get('/:id')
  async findOneUser(@Param('id') id: string) {
    return this.userService.findOneUser(Number(id));
  }

  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updateDto = {
      id: Number(id),
      ...body,
    };
    return this.userService.updateUser(updateDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
