import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import vitest from '@vitest/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['.wxt/', '.output/', 'node_modules/', 'promo/', 'dist/', 'package/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  unicorn.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions,
      },
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quote-props': ['error', 'as-needed'],
      quotes: ['error', 'single'],
      semi: ['error'],
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  {
    files: ['**/*.config.{js,mjs,ts}', 'scripts/**'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'unicorn/no-process-exit': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    ...vitest.configs.recommended,
    rules: {
      ...vitest.configs.recommended.rules,
      'unicorn/no-useless-undefined': 'off',
    },
  },
);
