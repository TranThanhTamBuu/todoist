import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { SECTION_REPOSITORY } from "./application/store/section.repository";
import { InMemorySectionRepository } from "./infrastructure/store/in-memory-section.repository";
import { SECTION_FIXTURES, sectionFixtures } from "./infrastructure/store/section.fixture";

const fixtures: Provider[] = [
  {
    provide: SECTION_FIXTURES,
    useValue: sectionFixtures,
  },
];

const repositories: Provider[] = [
  {
    provide: SECTION_REPOSITORY,
    useValue: InMemorySectionRepository,
  },
];

const commands: Provider[] = [];

const sagas: Provider[] = [];

const factories: Provider[] = [];

const controllers = [];

@Module({
  imports: [CqrsModule],
  providers: [...fixtures, ...repositories, ...sagas, ...factories, ...commands],
  controllers,
})
export class SectionModule {}
