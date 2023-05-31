import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CREATE-STUDENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'create-student',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'create-student',
          },
        },
      },
      {
        name: 'FIND-STUDENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'find-student',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'find-student',
          },
        },
      },
      {
        name: 'UPDATE-STUDENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'update-student',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'update-student',
          },
        },
      },
      {
        name: 'DELETE-STUDENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'delete-student',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'delete-student',
          },
        },
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
