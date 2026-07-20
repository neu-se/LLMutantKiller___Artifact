const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should only log deprecation warning when console.warn is available", () => {
    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Mock console.warn to track if it's called
    console.warn = () => {
      warnCalled = true;
    };

    // Test with console.warn available
    const result = Q().then(function() {
      // This will trigger the deprecation check in the promise chain
      return "result";
    });

    // Verify the promise resolves correctly
    return result.then((value: any) => {
      expect(value).toBe("result");
      // The mutation changes the condition from checking console.warn to always true
      // In the original code, this would only log if console.warn exists
      // In the mutated code, it will always try to log
      expect(warnCalled).toBe(true);
    }).finally(() => {
      // Restore console.warn
      console.warn = originalWarn;
    });
  });
});