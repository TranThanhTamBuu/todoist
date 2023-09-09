import { Controller, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("personal-workspace")
@Controller("personal-workspace")
@UseGuards()
export class PersonalWorkspaceController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
}
