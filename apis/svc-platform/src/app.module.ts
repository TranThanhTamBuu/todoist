import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/modules/config/config.module';

@Module({
  imports: [ConfigModule],
})
export class AppModule {}