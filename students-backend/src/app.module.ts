import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';

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
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
