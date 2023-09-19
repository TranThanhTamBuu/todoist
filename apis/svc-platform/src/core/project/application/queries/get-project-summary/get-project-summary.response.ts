export interface GetProjectSummaryQueryResponse {
  projectId: string;
  name: string;
  totalTasks: number;
  totalCompletedTasks: number;
  totalUncompletedTasks: number;
}
