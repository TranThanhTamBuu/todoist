import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CreatePersonalWorkspaceCommandHandler } from "./application/commands/create-personal-workspace/create-personal-workspace.command";
import { CreatePersonalWorkspaceSagas } from "./application/commands/create-personal-workspace/create-personal-workspace.saga";
import { UserEventsFactory } from "./application/proxy/bus/user-events.factory";
import { UserEventsSagas } from "./application/proxy/bus/user-events.saga";
import { PROJECT_PROXY } from "./application/proxy/project.proxy";
import { GetPersonalWorkspaceQueryHandler } from "./application/queries/get-personal-workspace/get-personal-workspace.query";
import { PERSONAL_WORKSPACE_REPOSITORY } from "./application/store/personal-workspace.repository";
import { QueryBusProjectProxy } from "./infrastructure/proxy/query-bus-project.proxy";
import { InMemoryPersonalWorkspaceRepository } from "./infrastructure/store/in-memory-personal-workspace.repository";
import { PERSONAL_WORKSPACE_FIXTURES, personalWorkspaceFixtures } from "./infrastructure/store/personal-workspace.fixture";
import { PersonalWorkspaceController } from "./infrastructure/web/personal-workspace.controller";

const fixtures: Provider[] = [
  {
    provide: PERSONAL_WORKSPACE_FIXTURES,
    useValue: personalWorkspaceFixtures,
  },
];

const repositories: Provider[] = [
  {
    provide: PERSONAL_WORKSPACE_REPOSITORY,
    useClass: InMemoryPersonalWorkspaceRepository,
  },
];

const proxies: Provider[] = [
  {
    provide: PROJECT_PROXY,
    useClass: QueryBusProjectProxy,
  },
];

const commands: Provider[] = [CreatePersonalWorkspaceCommandHandler];

const queries: Provider[] = [GetPersonalWorkspaceQueryHandler];

const sagas: Provider[] = [CreatePersonalWorkspaceSagas, UserEventsSagas];

const factories: Provider[] = [UserEventsFactory];

const controllers = [PersonalWorkspaceController];

@Module({
  imports: [CqrsModule],
  providers: [...fixtures, ...repositories, ...sagas, ...factories, ...proxies, ...commands, ...queries],
  controllers,
})
export class WorkspaceModule {}
