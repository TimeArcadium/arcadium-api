import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/*.test.ts", "**/*.spec.ts", "**/*-spec.ts"],
    coverage: { reporter: ["text", "lcov"] }
  }
});