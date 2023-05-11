import { IsInt, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  age: number;
}
