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
    const deprecatedFn = Q.deprecate(() => "result", "testFn", "use newFn");
    const result = deprecatedFn();

    expect(result).toBe("result");
    expect(warnCalled).toBe(true);

    // Restore console.warn
    console.warn = originalWarn;
  });
});