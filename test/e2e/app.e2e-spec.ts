import request from "supertest";

const baseURL = process.env.E2E_BASE_URL || "http://localhost:3000";

describe("App e2e", () => {
  it("GET /health -> 200", async () => {
    const res = await request(baseURL).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});
