/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-airbnb-with-typescript',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'vue/multi-word-component-names': 'off',
    'consistent-return': 'off',
    'arrow-body-style': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: [
    'functions/lib',
  ],
};
