export class GetPersonalWorkspaceOutDto {
  id: string;
  projectSummaries: {
    projectId: string;
    name: string;
    totalTasks: number;
    totalUncompletedTasks: number;
    totalCompletedTasks: number;
  };

  constructor(partial: Partial<GetPersonalWorkspaceOutDto>) {
    Object.assign(this, partial);
  }
}
