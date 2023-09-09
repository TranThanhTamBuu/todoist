import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { HttpControllerException } from "@todoist/ddd";

import { CreateUserCommand } from "../../application/commands/create-user/create-user.command";
import { UserResponse } from "../../application/responses/user.response";
import { CreateUserPostInDto } from "./dto/create-user-post-in.dto";
import { CreateUserPostOutDto } from "./dto/create-user-post-out.dto";

@ApiTags("user")
@Controller("user")
@UseGuards()
export class UserController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post("/")
  @ApiOperation({ description: "Create user by name and email" })
  @ApiOkResponse({ type: [CreateUserPostOutDto] })
  async createUser(@Body() { name, email }: CreateUserPostInDto) {
    try {
      const customerUser = await this.commandBus.execute<CreateUserCommand, UserResponse>(new CreateUserCommand(name, email));
      return new CreateUserPostOutDto(customerUser);
    } catch (error) {
      throw new HttpControllerException(error);
    }
  }
}
