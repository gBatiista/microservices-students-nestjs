import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CREATE-STUDENT',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'FIND-STUDENT',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
      {
        name: 'UPDATE-STUDENT',
        transport: Transport.TCP,
        options: {
          port: 3003,
        },
      },
      {
        name: 'DELETE-STUDENT',
        transport: Transport.TCP,
        options: {
          port: 3004,
        },
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
