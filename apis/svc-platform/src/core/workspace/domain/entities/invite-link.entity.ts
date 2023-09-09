import { Entity, EntityProps } from "@todoist/ddd";

export interface InviteLinkProps extends EntityProps {
  isEnabled: boolean;
  inviteCode: string;
}

export class InviteLink extends Entity<InviteLinkProps> {
  constructor(props: InviteLinkProps) {
    super(props);
  }

  get isEnabled() {
    return this.props.isEnabled;
  }

  get inviteCode() {
    return this.props.inviteCode;
  }
}
