import { Entity, EntityProps } from "@todoist/ddd";

import { MemberRoleEnum } from "../enums/member-role.enum";

export interface MemberProps extends EntityProps {
  userId: string;
  role: MemberRoleEnum;
}

export class Member extends Entity<MemberProps> {
  constructor(props: MemberProps) {
    super(props);
  }

  get userId() {
    return this.props.userId;
  }

  get role() {
    return this.props.role;
  }
}
