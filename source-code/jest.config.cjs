// jest.config.cjs (orchestrator root)

const path = require("path");

// If a subject repo has its own tsconfig and we set TS_JEST_TSCONFIG,
// ts-jest will use that. Otherwise fall back to a safe inline config.
const repoTsconfig = process.env.TS_JEST_TSCONFIG;

const tsJestTsconfig = repoTsconfig || {
  module: "commonjs",
  target: "ES2019",
  moduleResolution: "node",
  esModuleInterop: true,
  allowSyntheticDefaultImports: true,
  allowJs: true,
  resolveJsonModule: true,
  sourceMap: true,
  inlineSourceMap: true,
  isolatedModules: false,
};

module.exports = {
  // Use js-with-ts so ts-jest can handle both TS and “JS with TS config”
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",

  testMatch: [
    "**/*.test.ts",
    "**/*.spec.ts",
  ],

  transform: {
    "^.+\\.[tj]sx?$": [
      require.resolve("ts-jest", { paths: [__dirname] }),
      {
        tsconfig: tsJestTsconfig,
        diagnostics: {
          warnOnly: true,
          ignoreCodes: [2341, 7016, 2304],
        },
        babelConfig: {
          presets: [
            [
              require.resolve("@babel/preset-env", { paths: [__dirname] }),
              { targets: { node: "current" } },
            ],
          ],
        },
      },
    ],
  },

  transformIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};