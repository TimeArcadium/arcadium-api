import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.SWAGGER_ENABLED !== "false") {
    const config = new DocumentBuilder()
      .setTitle("Arcadium API")
      .setDescription("REST API do Arcadium")
      .setVersion("1.0.0")
      .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, doc);

    if (process.env.SWAGGER_WRITE === "true") {
      const fs = await import("node:fs");
      fs.writeFileSync("openapi.json", JSON.stringify(doc, null, 2));
    }
  }

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
bootstrap();
