export interface ProjectSummaryDto {
  projectId: string;
  name: string;
  totalTasks: number;
  totalUncompletedTasks: number;
  totalCompletedTasks: number;
}
