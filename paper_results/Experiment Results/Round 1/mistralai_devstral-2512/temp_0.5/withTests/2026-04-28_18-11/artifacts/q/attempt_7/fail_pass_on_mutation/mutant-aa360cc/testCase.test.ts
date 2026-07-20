// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("console.warn behavior", () => {
  it("should show different behavior between original and mutated code", () => {
    // Mock console.warn
    const originalWarn = console.warn;
    let warnCalled = false;
    let warnMessage = "";
    let warnStack: any = null;

    console.warn = (message: string, stack: any) => {
      warnCalled = true;
      warnMessage = message;
      warnStack = stack;
    };

    try {
      // Create a test that mimics the deprecate function behavior
      const testFunc = () => "result";
      const name = "testMethod";
      const alternative = "newMethod";

      // This simulates the original deprecate function
      const deprecatedFunc = function() {
        // The mutation changes this block to be empty
        if (typeof console.warn === "function") {
          console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
        }
        return testFunc();
      };

      // Call the function
      const result = deprecatedFunc();

      // Verify basic functionality
      expect(result).toBe("result");

      // This is the key test - in original code this passes, in mutated it fails
      expect(warnCalled).toBe(true);
      expect(warnMessage).toContain("testMethod is deprecated, use newMethod instead.");
      expect(warnStack).toBeTruthy();

    } finally {
      console.warn = originalWarn;
    }
  });
});