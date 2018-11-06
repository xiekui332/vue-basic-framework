module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    "amd": true,
    "es6": true,
    "node": true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  globals: {
    wx: true,
    QRCode: true
  },
  plugins: [
    'vue'
  ],
  rules: {
    'comma-dangle': 2,
    'quotes': [1, 'single'],
    // 'no-new': 0,
    'global-strict': 0,
    'no-unused-expressions': 0,
    'no-extend-native': 0,
    'no-undef': 0,
    'prefer-promise-reject-errors': 0,
    'semi': [1, 'always'],
    'no-extra-semi': 1,
    'no-unused-vars': 0,
    'no-mixed-spaces-and-tabs': 2,
    'curly': [1],
    'indent': [0, 4, { 'SwitchCase': 1 }],
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-trailing-spaces': [1, { 'skipBlankLines': true }],
    'no-multi-spaces': [0],
    'no-unreachable': 1,
    'no-alert': 0,
    'one-var': 0,
    'linebreak-style': [2, 'unix'],
    'generator-star-spacing': 'off',
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
