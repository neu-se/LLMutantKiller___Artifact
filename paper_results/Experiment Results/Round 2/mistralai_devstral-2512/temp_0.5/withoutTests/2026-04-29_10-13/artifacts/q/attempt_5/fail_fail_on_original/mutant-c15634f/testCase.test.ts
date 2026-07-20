// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_5/pending_category/mutant-c15634f/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deprecation warning", () => {
  it("should not call console.warn when console is not available", () => {
    const originalConsole = global.console;
    let warnCalled = false;

    // Replace console with a mock that tracks warn calls
    global.console = {
      warn: () => { warnCalled = true; }
    };

    try {
      // Trigger the deprecate function by calling allResolved
      Q.allResolved([Q.resolve(1)]);

      // In the original code, console.warn should not be called
      // because the condition checks both console and console.warn
      expect(warnCalled).toBe(false);
    } finally {
      global.console = originalConsole;
    }
  });
});