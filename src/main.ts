import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs"; // Importe o fs diretamente no topo

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

    // Se a variável para escrever o arquivo estiver ativa...
    if (process.env.SWAGGER_WRITE === "true") {
      // Escreve o arquivo...
      writeFileSync("openapi.json", JSON.stringify(doc, null, 2));

      // E AGORA A PARTE IMPORTANTE:
      await app.close(); // 1. Desliga a aplicação
      return;            // 2. Encerra a função bootstrap para não executar o app.listen()
    }
  }

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
bootstrap();