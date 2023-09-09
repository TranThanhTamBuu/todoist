import { Repository } from "@todoist/ddd";

import { Project } from "../../domain/entities/project.entity";

export const PROJECT_REPOSITORY = Symbol();

export interface ProjectRepository extends Repository<Project> {}
