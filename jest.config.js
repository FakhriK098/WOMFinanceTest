module.exports = {
  preset: 'react-native',
  watchman: false,
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^@components$': '<rootDir>/src/components/index',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@store$': '<rootDir>/src/store/index',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@typings/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  coverageThreshold: {
    global: {
      lines: 0,
      statements: 20,
    },
  },
};
