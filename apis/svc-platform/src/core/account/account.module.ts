import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CreateUserCommandHandler } from "./application/commands/create-user/create-user.command";
import { USER_REPOSITORY } from "./application/store/user.repository";
import { IDENTITY_PROVIDER_PROXY } from "./domain/proxy/identity-provider.proxy";
import { FakeIdentityProviderProxy } from "./infrastructure/proxy/fake-identity-provider.proxy";
import { InMemoryUserRepository } from "./infrastructure/store/in-memory-user.repository";
import { USER_FIXTURES, userFixtures } from "./infrastructure/store/user.fixture";
import { UserController } from "./infrastructure/web/user.controller";

const fixtures: Provider[] = [
  {
    provide: USER_FIXTURES,
    useValue: userFixtures,
  },
];

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: InMemoryUserRepository,
  },
];

const proxies: Provider[] = [
  {
    provide: IDENTITY_PROVIDER_PROXY,
    useClass: FakeIdentityProviderProxy,
  },
];

const commands: Provider[] = [CreateUserCommandHandler];

const controllers = [UserController];

@Module({
  imports: [CqrsModule],
  providers: [...fixtures, ...repositories, ...proxies, ...commands],
  controllers,
})
export class AccountModule {}
