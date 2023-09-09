import { Repository } from "@todoist/ddd";

import { Section } from "../../domain/entities/section.entity";

export const SECTION_REPOSITORY = Symbol();

export interface SectionRepository extends Repository<Section> {}
