import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { AccountModule } from "./core/account/account.module";
import { ProjectModule } from "./core/project/project.module";
import { WorkspaceModule } from "./core/workspace/workspace.module";
import { ConfigModule } from "./shared/modules/config/config.module";

@Module({
  imports: [ConfigModule, CqrsModule, AccountModule, WorkspaceModule, ProjectModule],
})
export class AppModule {}
