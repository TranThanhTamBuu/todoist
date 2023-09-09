import { IsEmail, IsString } from "class-validator";

export class CreateUserPostInDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
