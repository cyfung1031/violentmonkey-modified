// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  experimentalTernaries: false,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  quoteProps: "preserve",
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: "always",
  singleAttributePerLine: false,
}

module.exports = config
