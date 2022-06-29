import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      useESM: true,
    }
  },
  extensionsToTreatAsEsm: [ 
    ".ts" 
  ],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: [
    'text',
    'text-summary'
  ],
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/entity/*.ts',
    '!**/__tests__/**'
  ],
  moduleNameMapper: { 
    "^(\\.{1,2}/.*)\\.js$": "$1" 
  },
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)" 
  ]
}

export default config;
