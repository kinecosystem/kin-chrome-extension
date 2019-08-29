module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  rules: {
    'vue/no-unused-vars': 'error'
  },
  env: {
    amd: true,
    browser: true,
    node: true,
    webextensions: true
  }
};
