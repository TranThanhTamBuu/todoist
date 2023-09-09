import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { PROJECT_REPOSITORY } from "./application/store/project.repository";
import { InMemoryProjectRepository } from "./infrastructure/store/in-memory-project.repository";
import { PROJECT_FIXTURES, projectFixtures } from "./infrastructure/store/project.fixture";

const fixtures: Provider[] = [
  {
    provide: PROJECT_FIXTURES,
    useValue: projectFixtures,
  },
];

const repositories: Provider[] = [
  {
    provide: PROJECT_REPOSITORY,
    useValue: InMemoryProjectRepository,
  },
];

const commands: Provider[] = [];

const sagas: Provider[] = [];

const factories: Provider[] = [];

const controllers = [];

@Module({
  imports: [CqrsModule],
  providers: [...fixtures, ...repositories, ...sagas, ...factories, ...commands],
  controllers,
})
export class ProjectModule {}
