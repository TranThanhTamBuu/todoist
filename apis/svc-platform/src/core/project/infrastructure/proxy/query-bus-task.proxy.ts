import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

import { GetTaskSummaryByProjectIdQuery } from "src/core/task/application/queries/get-task-summary-by-project-id.query";
import { GetTaskSummaryQueryByProjectIdResponse } from "src/core/task/application/queries/get-task-summary-by-project-id.response";

import { TaskSummaryDto } from "../../application/proxy/dto/task-summary.dto";
import { TaskProxy } from "../../application/proxy/task.proxy";

@Injectable()
export class QueryBusTaskProxy implements TaskProxy {
  constructor(private readonly queryBus: QueryBus) {}

  getTaskSummaryByProjectId(projectId: string): Promise<TaskSummaryDto> {
    return this.queryBus.execute<GetTaskSummaryByProjectIdQuery, GetTaskSummaryQueryByProjectIdResponse>(
      new GetTaskSummaryByProjectIdQuery(projectId),
    );
  }
}
