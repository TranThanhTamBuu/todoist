import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { PersonalWorkspace } from "src/core/workspace/domain/entities/personal-workspace";
import { PersonalWorkspaceNotFound } from "src/core/workspace/domain/errors/personal-workspace-not-found.error";

import { ProjectSummaryDto } from "../../proxy/dto/project-summary.dto";
import { PROJECT_PROXY, ProjectProxy } from "../../proxy/project.proxy";
import { PERSONAL_WORKSPACE_REPOSITORY, PersonalWorkspaceRepository } from "../../store/personal-workspace.repository";
import { GetPersonalWorkspaceResponse } from "./get-personal-workspace.response";

export class GetPersonalWorkspaceQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetPersonalWorkspaceQuery)
export class GetPersonalWorkspaceQueryHandler implements IQueryHandler<GetPersonalWorkspaceQuery, GetPersonalWorkspaceResponse> {
  constructor(
    @Inject(PERSONAL_WORKSPACE_REPOSITORY) private readonly personalWorkspaceRepository: PersonalWorkspaceRepository,
    @Inject(PROJECT_PROXY) private readonly projectProxy: ProjectProxy,
  ) {}

  async execute({ userId }: GetPersonalWorkspaceQuery) {
    const personalWorkspace = await this.personalWorkspaceRepository.findOneByOwnerId(userId);

    if (!personalWorkspace) {
      throw new PersonalWorkspaceNotFound({ ownerId: userId });
    }

    const projectSummaries = await Promise.all(
      personalWorkspace.projectIds.map((projectId) => this.projectProxy.getProjectSummaryById(projectId)),
    );

    return this.toResponse(personalWorkspace, projectSummaries);
  }

  private toResponse(personalWorkspace: PersonalWorkspace, projectSummaries: ProjectSummaryDto[]): GetPersonalWorkspaceResponse {
    return {
      id: personalWorkspace.id.toString(),
      projectSummaries,
    };
  }
}
