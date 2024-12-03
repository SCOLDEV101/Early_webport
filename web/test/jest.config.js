global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;  // If needed for TextDecoder

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': ['babel-jest', { configFile: './test/babel.config.js' }],
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/',
  ],
  testURL: "http://localhost/",
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@components/(.*)$': "<rootDir>/src/app/components/$1",
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};