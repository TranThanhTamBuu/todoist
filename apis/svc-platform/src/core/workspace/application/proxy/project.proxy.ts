import { ProjectSummaryDto } from "./dto/project-summary.dto";

export const PROJECT_PROXY = Symbol();

export interface ProjectProxy {
  getProjectSummaryById(projectId: string): Promise<ProjectSummaryDto>;
}
