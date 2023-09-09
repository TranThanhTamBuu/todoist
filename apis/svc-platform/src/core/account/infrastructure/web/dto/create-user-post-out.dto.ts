import { IsOptional } from "class-validator";

export class CreateUserPostOutDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;

  @IsOptional()
  readonly avatarUrl: string;

  constructor(partial: Partial<CreateUserPostOutDto>) {
    Object.assign(this, partial);
  }
}
