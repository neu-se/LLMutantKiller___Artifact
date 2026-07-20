// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_6/pending_category/mutant-c15634f/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deprecation warning", () => {
  it("should not throw when console is not available", () => {
    const originalConsole = global.console;
    // @ts-expect-error - intentionally deleting console for test
    delete global.console;

    try {
      // This should not throw even when console is undefined
      // The mutation changes the condition from checking console existence to always true
      Q.allResolved([Q.resolve(1)]);
      expect(true).toBe(true);
    } finally {
      global.console = originalConsole;
    }
  });
});