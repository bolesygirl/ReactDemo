process.env.TZ = 'UTC';

module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: [
        "/node_modules/"
    ],
    moduleFileExtensions: [
        "js", "jsx"
    ],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/config/jest/jestMocks/styleMock.js",
        "\\.(jpg|jpeg|png)$": "<rootDir>/config/jest/jestMocks/fileMock.js"
    },
    rootDir: process.cwd(),
    roots: [
        process.cwd() + "/src"
    ],
    setupFiles: [
        process.cwd() + "/config/enzyme/enzyme.config.js"
    ],
    setupFilesAfterEnv: [
        process.cwd() + "/config/jest/jest.setup.js"
    ],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: [
        "**/?(*.)+(spec|test).js?(x)"
    ],
    testPathIgnorePatterns: [
        "/node_modules/"
    ]
};
