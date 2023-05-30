import { ClientKafka } from '@nestjs/microservices';
import { UpdateUserDto } from '../dto/update-user-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user-dto';
import { UserService } from './user.service';
import { Public } from 'src/auth/constants';
import { CreateErrorInterceptor } from '../interceptors/create.error.interceptor';
import { NotFoundErrorInterceptor } from '../interceptors/notFound.error.interceptor';
import { UpdateErrorInterceptor } from '../interceptors/update.error.interceptor';

@Controller('user')
export class UserController implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    @Inject('USER-ENGINE') private readonly userClient: ClientKafka,
  ) {}

  onModuleInit() {
    const listOfMessages = [
      'create-user',
      'find-one-user',
      'find-all-users',
      'update-user',
      'delete-user',
    ];

    listOfMessages.forEach(message => {
      this.userClient.subscribeToResponseOf(message);
    });
  }

  @Public()
  @UseInterceptors(new CreateErrorInterceptor())
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Get('/:id')
  async findOneUser(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @UseInterceptors(new UpdateErrorInterceptor())
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updateDto = {
      id: Number(id),
      ...body,
    };
    return this.userService.updateUser(updateDto);
  }

  @UseInterceptors(new NotFoundErrorInterceptor())
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
