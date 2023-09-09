import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";

import { ConfigService, setupSwagger } from "@todoist/ddd";

import { AppModule } from "./app.module";
import { ConfigSchema } from "./shared/modules/config/config.schema";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<ConfigSchema>);
  const port = configService.get("PORT");

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  setupSwagger(app);

  await app.startAllMicroservices();
  await app.listen(port);

  console.log(`🚀 ~ Endpoint ~ http://localhost:${port}`);
  console.log(`🚀 ~ API Docs ~ http://localhost:${port}/docs`);
}

bootstrap();
