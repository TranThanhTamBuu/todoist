import { Entity, EntityProps } from "@todoist/ddd";

import { Task } from "./task.entity";

export interface SectionProps extends EntityProps {
  name: string;
  tasks: Task[];
}

export class Section extends Entity<SectionProps> {
  private constructor(props: SectionProps) {
    super(props);
  }

  get name() {
    return this.props.name;
  }

  get task() {
    return this.props.tasks;
  }
}
