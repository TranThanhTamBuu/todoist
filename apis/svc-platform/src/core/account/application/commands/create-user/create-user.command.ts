import { Inject } from "@nestjs/common";
import { CommandHandler, EventBus } from "@nestjs/cqrs";

import { User } from "src/core/account/domain/entities/user.entity";
import { UserEmailAlreadyExists } from "src/core/account/domain/errors/user-email-already-exists.error";
import { UserCreatedEvent } from "src/core/account/domain/events/user-created.event";
import { IDENTITY_PROVIDER_PROXY, IdentityProviderProxy } from "src/core/account/domain/proxy/identity-provider.proxy";

import { UserResponseFromDomain } from "../../responses/user.response";
import { USER_REPOSITORY, UserRepository } from "../../store/user.repository";

export class CreateUserCommand {
  constructor(public readonly name: string, public readonly email: string) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(IDENTITY_PROVIDER_PROXY)
    private readonly identityProviderProxy: IdentityProviderProxy,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ name, email }: CreateUserCommand) {
    await this.assertEmailNotExist(email);

    const { accountId } = await this.identityProviderProxy.registerAccount(email, name);

    const user = await this.userRepository.save(
      new User({
        accountId,
        email,
        name,
      }),
    );

    this.eventBus.publish(new UserCreatedEvent(user.id.toString()));

    return UserResponseFromDomain(user);
  }

  async assertEmailNotExist(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new UserEmailAlreadyExists(email);
    }
  }
}
