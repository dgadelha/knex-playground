import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import angular from "angular-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import { URL, fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  eslint.configs.recommended,
  unicorn.configs.all,
  prettier,
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateAll, ...angular.configs.templateAccessibility],
    rules: {
      "@angular-eslint/template/i18n": "off",
      "@angular-eslint/template/prefer-ngsrc": "off",
      "prettier/prettier": ["error", { parser: "angular" }],
    },
  },
  {
    files: ["**/*.ts"],
    extends: [...tseslint.configs.strictTypeChecked, ...angular.configs.tsAll],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
    rules: {
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
      "@angular-eslint/prefer-signals": "warn",
      "@angular-eslint/prefer-standalone": "off",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/no-extraneous-class": "off",
    },
  },
  {
    rules: {
      "capitalized-comments": "off",
      "func-names": ["error", "always"],
      "unicorn/prefer-string-raw": "off",
      "unicorn/prefer-string-replace-all": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
);
