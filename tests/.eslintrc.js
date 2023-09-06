/* eslint-disable no-undef */
module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ],
    },
  },
  globals: {
    sinon: true,
    expect: true,
    modules: true,
    select: true,
    server: true,
  },
  parser: '@babel/eslint-parser',
  extends: 'eslint:recommended',
  env: {
    embertest: true,
    browser: true,
  },
  rules: {},
};
