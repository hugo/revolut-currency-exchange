/* eslint-env node */

module.exports = {
  bail: 1,
  verbose: true,
  testMatch: ['**/*.test.(js|ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/fileMock.js',
    '\\.css$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    'regenerator-runtime/runtime',
    '@testing-library/jest-dom/extend-expect',
  ],
}
