/* eslint-env node */

module.exports = {
  printWidth: 80,
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      options: {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: false,
        arrowParens: 'always',
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
      },
    },
  ],
}
