import { Inject } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";

import {
  PERSONAL_WORKSPACE_REPOSITORY,
  PersonalWorkspaceRepository,
} from "src/core/workspace/application/store/personal-workspace.repository";

import { PersonalWorkspace } from "../../../domain/entities/personal-workspace";
import { PersonalWorkspaceAlreadyExists } from "../../../domain/errors/personal-workspace-already-exists.error";

export class CreatePersonalWorkspaceCommand {
  constructor(public readonly userId: string) {}
}

@CommandHandler(CreatePersonalWorkspaceCommand)
export class CreatePersonalWorkspaceCommandHandler {
  constructor(@Inject(PERSONAL_WORKSPACE_REPOSITORY) private readonly personalWorkspaceRepository: PersonalWorkspaceRepository) {}

  async execute({ userId }: CreatePersonalWorkspaceCommand) {
    await this.assertPersonalWorkspaceNotExist(userId);

    const personalWorkspace = await this.personalWorkspaceRepository.save(
      new PersonalWorkspace({
        ownerId: userId,
        projectIds: [],
      }),
    );

    return personalWorkspace;
  }

  async assertPersonalWorkspaceNotExist(userId: string) {
    const personalWorkspace = await this.personalWorkspaceRepository.findOne(userId);
    if (personalWorkspace) {
      throw new PersonalWorkspaceAlreadyExists(userId);
    }
  }
}
