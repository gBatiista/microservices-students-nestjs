import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER-ENGINE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-engine',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-engine',
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
