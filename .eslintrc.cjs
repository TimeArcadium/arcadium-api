/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    env: { node: true, es2021: true },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
      // se usar tsconfig, adicione:
      // project: ["./tsconfig.json"],
      // tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
      // "prettier" // se usar Prettier
    ],
    ignorePatterns: ["dist/", "node_modules/", "coverage/"],
    rules: {
      // suas regras aqui se quiser
    }
  };
  