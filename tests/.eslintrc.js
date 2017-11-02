module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  globals: {
    sinon: true,
    expect: true,
    modules: true,
    select: true,
    server: true
  },
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  env: {
    'embertest': true,
    'browser': true
  },
  rules: {
  }

};
