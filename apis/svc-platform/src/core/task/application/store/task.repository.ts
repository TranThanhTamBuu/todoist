import { Repository } from "@todoist/ddd";

import { Task } from "../../domain/entities/task.entity";

export const TASK_REPOSITORY = Symbol();

export interface TaskRepository extends Repository<Task> {}
