// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-d7d374d/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library console handling", () => {
  it("should handle missing console gracefully", () => {
    const originalConsole = global.console;
    // @ts-ignore
    delete global.console;

    try {
      // Create a simple promise chain that might internally use deprecate
      const promise = Q.resolve("test value");
      return promise.then(value => {
        expect(value).toBe("test value");
      });
    } finally {
      global.console = originalConsole;
    }
  });
});