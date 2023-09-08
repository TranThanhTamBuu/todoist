import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@todoist/ddd';
import { AppModule } from './app.module';
import { ConfigSchema } from './shared/modules/config/config.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<ConfigSchema>);

  await app.listen(configService.get('PORT'));
}
bootstrap();
