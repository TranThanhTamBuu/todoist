import { RegisterAccountResponse } from "./responses/register-account.response";

export const IDENTITY_PROVIDER_PROXY = Symbol();

export interface IdentityProviderProxy {
  registerAccount(email: string, name: string): Promise<RegisterAccountResponse>;
}
