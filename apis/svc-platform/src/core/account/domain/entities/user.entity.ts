import { Entity, EntityProps } from "@todoist/ddd";

export interface UserProps extends EntityProps {
  accountId: string;
  name: string;
  avatarUrl?: string;
  email: string;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get accountId() {
    return this.props.accountId;
  }

  get avatarUrl() {
    return this.props.avatarUrl;
  }
}
