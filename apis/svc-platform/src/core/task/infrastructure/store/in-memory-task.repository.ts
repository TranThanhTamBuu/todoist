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

  async findByProjectId(projectId: string): Promise<Task[]> {
    const result: Task[] = [];

    const filterTasks = (tasks: Task[]) =>
      tasks.forEach((task) => {
        if (projectId === task.projectId) {
          result.push(task);
        }
        filterTasks(task.subTask);
      });

    filterTasks(this.toArray());

    return result;
  }
}
