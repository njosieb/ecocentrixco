module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    jsx: true,
    modules: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  overrides: [
    {
      files: ["src/**/*"],
      rules: {
        "no-var": ["error"],
        radix: ["error"],
        "prettier/prettier": "warn",
        "react/jsx-max-props-per-line": "off"
      }
    }
  ]
};
