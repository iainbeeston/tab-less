import js from '@eslint/js';
import globals from 'globals';
import mocha from 'eslint-plugin-mocha';
import unicorn from 'eslint-plugin-unicorn';

export default [
  js.configs.recommended,
  mocha.configs.recommended,
  unicorn.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.webextensions,
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quote-props': ['error', 'as-needed'],
      'quotes': ['error', 'single'],
      'semi': ['error'],
      'unicorn/prefer-module': ['off'],
      'unicorn/filename-case': ['error', {'case': 'snakeCase', 'ignore': ['Gruntfile.js']}]
    }
  }
];
