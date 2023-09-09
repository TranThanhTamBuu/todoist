import { AggregateRoot, EntityProps } from "@todoist/ddd";

import { InviteLink } from "./invite-link.entity";
import { Member } from "./member.entity";

export interface WorkSpaceProps extends EntityProps {
  ownerId: string;
  name: string;
  logoUrl: string;
  inviteLink: InviteLink;
  members?: Member[];
}

export class WorkSpace extends AggregateRoot<WorkSpaceProps> {
  constructor(props: WorkSpaceProps) {
    super(props);
  }

  get ownerId() {
    return this.props.ownerId;
  }

  get name() {
    return this.props.name;
  }

  get logoUrl() {
    return this.props.logoUrl;
  }

  get members() {
    return this.props.members;
  }

  get inviteLink() {
    return this.props.inviteLink;
  }
}
