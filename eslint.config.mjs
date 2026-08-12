import js from "@eslint/js"
import tseslint from "typescript-eslint"
import * as figmaPlugin from "@figma/eslint-plugin-figma-plugins"
import { defineConfig } from "eslint/config"

export default defineConfig(
  {
    ignores: ["dist/**", "node_modules/**", "assets/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@figma/figma-plugins": figmaPlugin,
    },
    rules: {
      ...figmaPlugin.flatConfigs.recommended.rules,
    },
  }
)
