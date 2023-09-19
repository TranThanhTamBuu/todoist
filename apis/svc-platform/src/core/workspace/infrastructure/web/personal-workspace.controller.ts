import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { HttpControllerException } from "@todoist/ddd";

import { GetPersonalWorkspaceQuery } from "../../application/queries/get-personal-workspace/get-personal-workspace.query";
import { GetPersonalWorkspaceResponse } from "../../application/queries/get-personal-workspace/get-personal-workspace.response";
import { GetPersonalWorkspaceOutDto } from "./dto/get-personal-workspace-out.dto";

@ApiTags("personal-workspace")
@Controller("personal-workspace")
@UseGuards()
export class PersonalWorkspaceController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get("/:userId")
  @ApiOperation({ description: "Get personal workspace" })
  @ApiOkResponse({ type: GetPersonalWorkspaceOutDto })
  async getSuppliers(@Param("userId") userId: string) {
    try {
      const personalWorkspace = await this.queryBus.execute<GetPersonalWorkspaceQuery, GetPersonalWorkspaceResponse>(
        new GetPersonalWorkspaceQuery(userId),
      );
      return personalWorkspace;
    } catch (error) {
      throw new HttpControllerException(error);
    }
  }
}
