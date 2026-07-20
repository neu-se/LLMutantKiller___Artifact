// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_10/pending_category/mutant-1cdbec1/testCase.test.ts
const vm = require('vm');
const fs = require('fs');
const path = require('path');

describe("Q global initialization", () => {
  it("should initialize Q when only window is defined (no self)", () => {
    // Read the Q module source code
    const qSource = fs.readFileSync(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"), 'utf8');

    // Create a sandbox that simulates browser environment with only window
    const sandbox: any = {
      window: {},
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      require: function(id: string) {
        if (id === 'module' || id === 'exports') return {};
        return require(id);
      },
      module: {},
      exports: {},
      // Ensure we're in browser mode by not having process
      process: undefined
    };

    // Execute the Q module
    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    // Check if Q was initialized on window
    const qInitialized = sandbox.window.Q !== undefined;

    // This should be true in original code (|| condition)
    // but false in mutated code (&& condition)
    expect(qInitialized).toBe(true);
  });
});