import { Inject, Injectable } from "@nestjs/common";

import { InMemoryRepository } from "@todoist/ddd";

import { SectionRepository } from "../../application/store/section.repository";
import { Section } from "../../domain/entities/section.entity";
import { SECTION_FIXTURES } from "./section.fixture";

@Injectable()
export class InMemorySectionRepository extends InMemoryRepository<Section> implements SectionRepository {
  constructor(@Inject(SECTION_FIXTURES) private readonly sectionFixtures: Section[]) {
    super(sectionFixtures);
  }
}
