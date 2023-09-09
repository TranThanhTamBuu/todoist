import { isEqual } from "lodash";

export abstract class ValueObject<Props> {
  constructor(protected props: Props) {
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<Props>): boolean {
    return !!vo?.props && isEqual(this.props, vo.props);
  }

  getProps(): Props {
    return this.props;
  }

  abstract validate(): void;
}
