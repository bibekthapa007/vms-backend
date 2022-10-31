/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  moduleNameMapper: {
    'src/{.*}': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
};
