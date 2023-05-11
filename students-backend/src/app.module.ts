import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
