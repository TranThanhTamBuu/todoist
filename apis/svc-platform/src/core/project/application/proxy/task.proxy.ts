import { TaskSummaryDto } from "./dto/task-summary.dto";

export const TASK_PROXY = Symbol();

export interface TaskProxy {
  getTaskSummaryByProjectId(projectId: string): Promise<TaskSummaryDto>;
}
