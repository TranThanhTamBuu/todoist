import { Entity, EntityProps } from "@todoist/ddd";

export interface PersonalWorkspaceProps extends EntityProps {
  ownerId: string;
}

export class PersonalWorkspace extends Entity<PersonalWorkspaceProps> {
  constructor(props: PersonalWorkspaceProps) {
    super(props);
  }

  get ownerId() {
    return this.props.ownerId;
  }
}
