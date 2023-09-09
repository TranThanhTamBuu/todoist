import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
  setupDocumentation(app);
}

function setupDocumentation(app: INestApplication) {
  const options = new DocumentBuilder().setTitle("Todoist API").setVersion("1.0").build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);
}
