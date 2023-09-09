import { User } from "../../domain/entities/user.entity";

export interface UserResponse {
  id: string;
  accountId: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export const UserResponseFromDomain = (entity: User): UserResponse => ({
  id: entity.id.toString(),
  accountId: entity.accountId.toString(),
  email: entity.email,
  name: entity.name,
  avatarUrl: entity.avatarUrl,
});
