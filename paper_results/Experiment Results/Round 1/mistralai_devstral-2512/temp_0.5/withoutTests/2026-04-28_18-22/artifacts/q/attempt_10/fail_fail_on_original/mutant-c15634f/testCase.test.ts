// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c15634f/testCase.test.ts
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

// The Q library is a UMD module that exports a factory function
// We need to call it to get the actual Q object
const Q = typeof qModule === 'function' ? qModule() : qModule;

describe("deprecate function", () => {
  it("should handle missing console gracefully", () => {
    // Store original console
    const originalConsole = global.console;

    try {
      // Remove console to test the mutation
      // @ts-expect-error - We are intentionally deleting console for this test
      delete global.console;

      // Create a simple callback function
      const callback = () => "test result";

      // The deprecate function should be available on the Q object
      if (typeof Q.deprecate !== 'function') {
        throw new Error("Q.deprecate is not available");
      }

      // The deprecate function should not throw even when console is missing
      // In the original code, it checks if console exists before using it
      // In the mutated code, it always tries to use console.warn which will throw
      expect(() => {
        const deprecatedFunc = Q.deprecate(callback, "oldFunction", "newFunction");
        const result = deprecatedFunc();
        expect(result).toBe("test result");
      }).not.toThrow();
    } finally {
      // Restore console
      global.console = originalConsole;
    }
  });
});