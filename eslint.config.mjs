import js from '@eslint/js';
import globals from 'globals';
import mocha from 'eslint-plugin-mocha';

export default [
  js.configs.recommended,
  mocha.configs.recommended,
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
      'semi': ['error']
    }
  }
];
