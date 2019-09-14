module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/no-unused-vars': 'error'
  },
  env: {
    amd: true,
    browser: true,
    node: true,
    webextensions: true
  }
};
