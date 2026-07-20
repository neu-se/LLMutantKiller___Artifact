// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-d7d374d/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deprecate console check", () => {
  it("should handle missing console in deprecate function", () => {
    const originalConsole = global.console;
    // @ts-ignore
    delete global.console;

    try {
      // Try to access a deprecated method that should trigger the deprecate wrapper
      // Q.allResolved is deprecated in favor of Q.allSettled
      const promise = Q.allResolved([Q.resolve(1), Q.resolve(2)]);

      return promise.then(results => {
        expect(results.length).toBe(2);
      });
    } catch (error) {
      // If we get here, the mutation caused an error when console was undefined
      throw error;
    } finally {
      global.console = originalConsole;
    }
  });
});