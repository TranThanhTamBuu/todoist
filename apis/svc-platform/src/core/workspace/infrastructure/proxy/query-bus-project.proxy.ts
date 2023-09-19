import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

import { GetProjectSummaryQuery } from "src/core/project/application/queries/get-project-summary/get-project-summary.query";
import { GetProjectSummaryQueryResponse } from "src/core/project/application/queries/get-project-summary/get-project-summary.response";

import { ProjectSummaryDto } from "../../application/proxy/dto/project-summary.dto";
import { ProjectProxy } from "../../application/proxy/project.proxy";

@Injectable()
export class QueryBusProjectProxy implements ProjectProxy {
  constructor(private readonly queryBus: QueryBus) {}

  getProjectSummaryById(projectId: string): Promise<ProjectSummaryDto> {
    return this.queryBus.execute<GetProjectSummaryQuery, GetProjectSummaryQueryResponse>(new GetProjectSummaryQuery(projectId));
  }
}
