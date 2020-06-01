
module.exports = {
  root: true,
  env: {
    "es6": true,
    "node": true,
    "browser": true
  },
  plugins: [
    'vue'
  ],
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  rules: {
    "no-unused-vars": [0],
    "no-console": [1],
    "no-underscore-dangle": [0],
    "no-param-reassign": [0],
    "camelcase": [1],
    "radix": [0],
    "linebreak-style": [0, "error", "windows"],
    "max-len": [0],
    "import/no-unresolved": [0],
    "import/extensions": [0],
    "import/no-cycle":[0],
  },
  parserOptions: {
    "parser": 'babel-eslint',
    "sourceType": "module"
  },
};
