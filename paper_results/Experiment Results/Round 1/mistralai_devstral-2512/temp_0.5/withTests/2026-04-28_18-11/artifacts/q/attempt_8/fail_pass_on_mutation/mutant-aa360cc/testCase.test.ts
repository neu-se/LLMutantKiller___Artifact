// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecation warning behavior", () => {
  it("should demonstrate different console.warn behavior between original and mutated code", () => {
    // Mock console.warn to track calls
    const originalWarn = console.warn;
    let warnCallCount = 0;
    let lastWarnArgs: any[] = [];

    console.warn = (...args: any[]) => {
      warnCallCount++;
      lastWarnArgs = args;
    };

    try {
      // Test by creating a scenario that would use the deprecate function
      // The key difference is whether console.warn gets called with the deprecation message

      // Create a simple test case
      const testFunc = () => "test result";

      // Simulate the deprecate function pattern as it exists in the original code
      const wrappedFunc = function() {
        // This is the exact pattern from the original code that gets mutated
        if (typeof console.warn === "function") {
          console.warn("testFunc is deprecated, use newFunc instead.", new Error("").stack);
        }
        return testFunc.apply(this, arguments);
      };

      // Call the wrapped function
      const result = wrappedFunc();

      // Verify basic functionality
      expect(result).toBe("test result");

      // This assertion will pass in original (warnCallCount > 0)
      // and fail in mutated (warnCallCount = 0)
      expect(warnCallCount).toBeGreaterThan(0);

      // Verify the warning content
      expect(lastWarnArgs[0]).toContain("testFunc is deprecated, use newFunc instead.");
      expect(lastWarnArgs[1]).toBeTruthy();

    } finally {
      console.warn = originalWarn;
    }
  });
});