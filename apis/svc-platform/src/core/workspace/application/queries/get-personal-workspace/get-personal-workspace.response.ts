interface ProjectSummaryDtoResponse {
  projectId: string;
  name: string;
  totalTasks: number;
  totalUncompletedTasks: number;
  totalCompletedTasks: number;
}

export interface GetPersonalWorkspaceResponse {
  id: string;
  projectSummaries: ProjectSummaryDtoResponse[];
}
