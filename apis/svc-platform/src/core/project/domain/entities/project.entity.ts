import { AggregateRoot, EntityProps } from "@todoist/ddd";

import { Section } from "./section.entity";

export interface ProjectProps extends EntityProps {
  name: string;
  workspaceId: string;
  sections: Section[];
}

export class Project extends AggregateRoot<ProjectProps> {
  private constructor(props: ProjectProps) {
    super(props);
  }

  get name() {
    return this.props.name;
  }

  get workspaceId() {
    return this.props.name;
  }
}
