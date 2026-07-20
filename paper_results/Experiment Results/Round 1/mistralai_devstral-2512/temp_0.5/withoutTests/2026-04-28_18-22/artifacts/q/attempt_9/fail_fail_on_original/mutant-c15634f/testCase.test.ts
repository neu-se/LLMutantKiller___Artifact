// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c15634f/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

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

      // Access deprecate from the module directly
      const deprecate = Q.deprecate || (Q.default && Q.default.deprecate);

      if (typeof deprecate !== 'function') {
        throw new Error("deprecate function not found in Q module");
      }

      // The deprecate function should not throw even when console is missing
      // In the original code, it checks if console exists before using it
      // In the mutated code, it always tries to use console.warn which will throw
      expect(() => {
        const deprecatedFunc = deprecate(callback, "oldFunction", "newFunction");
        const result = deprecatedFunc();
        expect(result).toBe("test result");
      }).not.toThrow();
    } finally {
      // Restore console
      global.console = originalConsole;
    }
  });
});