/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  collectCoverage: true,
  testTimeout: 30000,
  preset: "ts-jest",
  modulePathIgnorePatterns: ["<rootDir>/build"],
  roots: ["<rootDir>/src/tests/"],
  testMatch: ["<rootDir>/src/tests/**/*.test.{ts,tsx}"],
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
