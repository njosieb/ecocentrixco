module.exports = {
  root: true,
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
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    require.resolve("eslint-config-prettier")
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
