// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_8/pending_category/mutant-1cdbec1/testCase.test.ts
const vm = require('vm');
const fs = require('fs');
const path = require('path');

describe("Q global initialization", () => {
  it("should initialize Q globally when only window is defined (no self)", () => {
    // Read the Q module source code
    const qSource = fs.readFileSync(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"), 'utf8');

    // Create a sandbox that simulates a browser environment with only window
    const sandbox: any = {
      window: {},
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      require: function(id: string) {
        if (id === 'module' || id === 'exports') {
          return {};
        }
        return require(id);
      },
      module: {},
      exports: {}
    };

    // Execute the Q module in this sandbox
    vm.createContext(sandbox);
    try {
      vm.runInContext(qSource, sandbox);
    } catch (e) {
      // Expected to fail in this environment, but we want to check if Q was set
    }

    // The key test: Q should be set on window when only window is defined
    expect(sandbox.window.Q).toBeDefined();
  });
});