import { Entity, EntityProps } from "@todoist/ddd";

export interface TaskProps extends EntityProps {
  projectId: string;
  sectionId: string;
  name: string;
  description?: string;
  dueDate?: Date;
  subTask?: Task[];
  assigneeIds: string[];
  isCompleted?: boolean;
}

export class Task extends Entity<TaskProps> {
  private constructor(props: TaskProps) {
    super(props);
  }

  get projectId() {
    return this.props.projectId;
  }

  get sectionId() {
    return this.props.sectionId;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get dueDate() {
    return this.props.dueDate;
  }

  get subTask() {
    return this.props.subTask;
  }

  get assigneeIds() {
    return this.props.assigneeIds;
  }

  get isCompleted() {
    return this.props.isCompleted;
  }
}
