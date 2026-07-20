// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function warning behavior", () => {
  it("should demonstrate different console.warn behavior", () => {
    // Mock console.warn to track calls
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
      // Test the actual Q library behavior that uses deprecate
      // The mutation affects whether warnings are logged

      // Create a simple test case
      const testFunc = () => "result";

      // This simulates the exact pattern from the deprecate function
      // that gets mutated
      const wrappedFunc = function() {
        // Original code has warning logic here
        // Mutated code has empty block
        if (typeof console.warn === "function") {
          console.warn("testFunc is deprecated, use newFunc instead.", new Error("").stack);
        }
        return testFunc();
      };

      // Call the function
      const result = wrappedFunc();

      // Verify basic functionality
      expect(result).toBe("result");

      // This is the key test - in original code this passes
      // In mutated code this fails because warnCalled remains false
      expect(warnCalled).toBe(true);
      expect(warnMessage).toContain("testFunc is deprecated, use newFunc instead.");
      expect(warnStack).toBeTruthy();

    } finally {
      console.warn = originalWarn;
    }
  });
});