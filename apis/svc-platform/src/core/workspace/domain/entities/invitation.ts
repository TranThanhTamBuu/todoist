import { Entity, EntityProps } from "@todoist/ddd";

export interface InvitationProps extends EntityProps {
  email: string;
  inviteCode: string;
}

export class Invitation extends Entity<InvitationProps> {
  constructor(props: InvitationProps) {
    super(props);
  }

  get email() {
    return this.props.email;
  }

  get inviteCode() {
    return this.props.email;
  }
}
