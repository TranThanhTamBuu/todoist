import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { TASK_REPOSITORY } from "./application/store/task.repository";
import { InMemoryTaskRepository } from "./infrastructure/store/in-memory-task.repository";
import { TASK_FIXTURES, taskFixtures } from "./infrastructure/store/task.fixture";

const fixtures: Provider[] = [
  {
    provide: TASK_FIXTURES,
    useValue: taskFixtures,
  },
];

const repositories: Provider[] = [
  {
    provide: TASK_REPOSITORY,
    useValue: InMemoryTaskRepository,
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
export class TaskModule {}
