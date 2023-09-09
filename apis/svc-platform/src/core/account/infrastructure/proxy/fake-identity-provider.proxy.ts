import { Injectable } from "@nestjs/common";

import { UniqueEntityId } from "@todoist/ddd";

import { IdentityProviderProxy } from "../../domain/proxy/identity-provider.proxy";
import { RegisterAccountResponse } from "../../domain/proxy/responses/register-account.response";

@Injectable()
export class FakeIdentityProviderProxy implements IdentityProviderProxy {
  constructor() {}

  async registerAccount(): Promise<RegisterAccountResponse> {
    return {
      accountId: new UniqueEntityId().toString(),
    };
  }
}
