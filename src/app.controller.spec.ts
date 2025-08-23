import { Test } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController (unit)", () => {
  it("hello() deve retornar mensagem", async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    const controller = moduleRef.get(AppController);
    expect(controller.hello()).toEqual({ ok: true, message: "Arcadium API" });
  });
});
