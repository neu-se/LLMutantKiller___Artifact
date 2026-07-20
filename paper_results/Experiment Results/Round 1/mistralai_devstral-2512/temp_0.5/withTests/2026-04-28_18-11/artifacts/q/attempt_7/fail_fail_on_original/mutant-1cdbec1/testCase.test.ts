// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_7/pending_category/mutant-1cdbec1/testCase.test.ts
const vm = require('vm');
const fs = require('fs');
const path = require('path');

describe("Q global initialization", () => {
  it("should initialize Q globally when only window is defined (no self)", () => {
    // Read the Q module source code
    const qSource = fs.readFileSync(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"), 'utf8');

    // Test case 1: Only window is defined (no self)
    const sandbox1: any = {
      window: {},
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      require: require,
      module: { exports: {} },
      exports: {}
    };

    vm.createContext(sandbox1);
    vm.runInContext(qSource, sandbox1);

    // Should initialize Q globally when only window is defined
    expect(sandbox1.Q).toBeDefined();
    expect(sandbox1.Q).toBe(sandbox1.module.exports);

    // Test case 2: Both window and self are defined
    const sandbox2: any = {
      window: {},
      self: {},
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      require: require,
      module: { exports: {} },
      exports: {}
    };

    vm.createContext(sandbox2);
    vm.runInContext(qSource, sandbox2);

    // Should also initialize Q globally when both are defined
    expect(sandbox2.Q).toBeDefined();
    expect(sandbox2.Q).toBe(sandbox2.module.exports);
  });
});