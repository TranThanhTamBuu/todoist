import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { TASK_REPOSITORY, TaskRepository } from "../store/task.repository";
import { GetTaskSummaryQueryByProjectIdResponse } from "./get-task-summary-by-project-id.response";

export class GetTaskSummaryByProjectIdQuery {
  constructor(public readonly projectId: string) {}
}

@QueryHandler(GetTaskSummaryByProjectIdQuery)
export class GetTaskSummaryByProjectIdQueryHandler
  implements IQueryHandler<GetTaskSummaryByProjectIdQuery, GetTaskSummaryQueryByProjectIdResponse>
{
  constructor(@Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository) {}

  async execute({ projectId }: GetTaskSummaryByProjectIdQuery) {
    const tasks = await this.taskRepository.findByProjectId(projectId);
    const totalTasks = tasks.length;
    const totalCompletedTasks = tasks.filter((task) => task.isCompleted).length;
    const totalUncompletedTasks = totalTasks - totalCompletedTasks;

    return {
      totalTasks,
      totalCompletedTasks,
      totalUncompletedTasks,
    };
  }
}
