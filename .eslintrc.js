module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "ecmaFeatures": {
    "destructuring": true
  },
  "extends": "airbnb",
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": "off",
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": "off",
    "no-debugger": "off",
    "experimentalDecorators": "off",
    "no-restricted-syntax": "off",
    "no-restricted-globals": "off",
    "no-underscore-dangle": "off",
    "max-len": "off",
    "global-require": "off",
  },
};
