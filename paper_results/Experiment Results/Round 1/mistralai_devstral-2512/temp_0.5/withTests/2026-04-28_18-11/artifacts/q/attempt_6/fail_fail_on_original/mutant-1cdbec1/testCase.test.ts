// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_6/pending_category/mutant-1cdbec1/testCase.test.ts
const vm = require('vm');
const fs = require('fs');
const path = require('path');

describe("Q global initialization", () => {
  it("should initialize Q globally when only window is defined", () => {
    // Read the Q module source code
    const qSource = fs.readFileSync(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"), 'utf8');

    // Create a sandbox with only window defined (no self)
    const sandbox: any = {
      window: {},
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      require: require,
      module: { exports: {} },
      exports: {}
    };

    // Execute the Q module in this sandbox
    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    // Verify Q was initialized globally in the sandbox
    expect(sandbox.Q).toBeDefined();
    expect(sandbox.Q).toBe(sandbox.module.exports);
  });
});