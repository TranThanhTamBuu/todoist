import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class GetPersonalWorkspaceQuery {
  constructor(private readonly userId: string) {}
}

@QueryHandler(GetPersonalWorkspaceQuery)
export class GetPersonalWorkspaceQueryHandler implements IQueryHandler<GetPersonalWorkspaceQuery, any> {
  constructor() {}

  async execute() {}
}
