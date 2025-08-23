import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("/")
  hello() {
    return { ok: true, message: "Arcadium API" };
  }
}
