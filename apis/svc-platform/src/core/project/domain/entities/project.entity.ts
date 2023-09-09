import { Entity, EntityProps } from "@todoist/ddd";

export interface ProjectProps extends EntityProps {
  name: string;
}

export class Project extends Entity<ProjectProps> {
  private constructor(props: ProjectProps) {
    super(props);
  }

  get name() {
    return this.props.name;
  }
}
