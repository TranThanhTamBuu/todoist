import { Inject, Injectable } from "@nestjs/common";

import { InMemoryRepository } from "@todoist/ddd";

import { TaskRepository } from "../../application/store/task.repository";
import { Task } from "../../domain/entities/task.entity";
import { TASK_FIXTURES } from "./task.fixture";

@Injectable()
export class InMemoryTaskRepository extends InMemoryRepository<Task> implements TaskRepository {
  constructor(@Inject(TASK_FIXTURES) private readonly taskFixtures: Task[]) {
    super(taskFixtures);
  }
}
