module.exports = {
    preset: 'react-native',
    clearMocks: true,
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        '<rootDir>/jest.setup.js'
    ],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|react-native-paper|redux-mock-store|@testing-library/react-native)/)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}', // Include ts and tsx
        '!**/node_modules/**',
        '!**/coverage/**',
    ],
    coverageReporters: ['text', 'lcov'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
    },
    globals: {
        'ts-jest': {
            babelConfig: true,
        },
    },
};