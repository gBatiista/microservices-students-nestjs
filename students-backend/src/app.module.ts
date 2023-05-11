import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [AuthModule, UserModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
