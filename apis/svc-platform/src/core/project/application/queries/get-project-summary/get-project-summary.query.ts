import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { Project } from "src/core/project/domain/entities/project.entity";

import { TaskSummaryDto } from "../../proxy/dto/task-summary.dto";
import { TASK_PROXY, TaskProxy } from "../../proxy/task.proxy";
import { PROJECT_REPOSITORY, ProjectRepository } from "../../store/project.repository";
import { GetProjectSummaryQueryResponse } from "./get-project-summary.response";

export class GetProjectSummaryQuery {
  constructor(readonly projectId: string) {}
}

@QueryHandler(GetProjectSummaryQuery)
export class GetProjectSummaryQueryHandler implements IQueryHandler<GetProjectSummaryQuery, GetProjectSummaryQueryResponse> {
  constructor(
    @Inject(PROJECT_REPOSITORY) private readonly projectRepository: ProjectRepository,
    @Inject(TASK_PROXY) private readonly taskProxy: TaskProxy,
  ) {}

  async execute({ projectId }: GetProjectSummaryQuery) {
    const project = await this.projectRepository.findOne(projectId);
    const taskSummary = await this.taskProxy.getTaskSummaryByProjectId(projectId);

    return this.toResponse(project, taskSummary);
  }

  private toResponse(project: Project, taskSummary: TaskSummaryDto): GetProjectSummaryQueryResponse {
    return {
      projectId: project.id.toString(),
      name: project.name,
      totalTasks: taskSummary.totalTasks,
      totalCompletedTasks: taskSummary.totalCompletedTasks,
      totalUncompletedTasks: taskSummary.totalUncompletedTasks,
    };
  }
}
