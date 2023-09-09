import { Entity, EntityProps } from "@todoist/ddd";

export interface SectionProps extends EntityProps {
  name: string;
}

export class Section extends Entity<SectionProps> {
  private constructor(props: SectionProps) {
    super(props);
  }

  get name() {
    return this.props.name;
  }
}
