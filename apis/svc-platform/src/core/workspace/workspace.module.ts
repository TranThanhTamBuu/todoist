import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CreatePersonalWorkspaceCommandHandler } from "./application/commands/create-personal-workspace/create-personal-workspace.command";
import { CreatePersonalWorkspaceSagas } from "./application/commands/create-personal-workspace/create-personal-workspace.saga";
import { UserEventsFactory } from "./application/proxy/bus/user-events.factory";
import { UserEventsSagas } from "./application/proxy/bus/user-events.saga";
import { PERSONAL_WORKSPACE_REPOSITORY } from "./application/store/personal-workspace.repository";
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
    useValue: InMemoryPersonalWorkspaceRepository,
  },
];

const commands: Provider[] = [CreatePersonalWorkspaceCommandHandler];

const sagas: Provider[] = [CreatePersonalWorkspaceSagas, UserEventsSagas];

const factories: Provider[] = [UserEventsFactory];

const controllers = [PersonalWorkspaceController];

@Module({
  imports: [CqrsModule],
  providers: [...fixtures, ...repositories, ...sagas, ...factories, ...commands],
  controllers,
})
export class WorkspaceModule {}
