import { Inject, Injectable } from "@nestjs/common";

import { InMemoryRepository } from "@todoist/ddd";

import { ProjectRepository } from "../../application/store/project.repository";
import { Project } from "../../domain/entities/project.entity";
import { PROJECT_FIXTURES } from "./project.fixture";

@Injectable()
export class InMemoryProjectRepository extends InMemoryRepository<Project> implements ProjectRepository {
  constructor(@Inject(PROJECT_FIXTURES) private readonly projectFixtures: Project[]) {
    super(projectFixtures);
  }
}
