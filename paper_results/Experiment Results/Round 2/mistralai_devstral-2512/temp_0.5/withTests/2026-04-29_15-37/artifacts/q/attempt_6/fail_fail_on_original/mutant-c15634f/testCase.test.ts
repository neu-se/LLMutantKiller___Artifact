const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should check console.warn availability before logging", () => {
    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Mock console.warn to track if it's called
    console.warn = () => {
      warnCalled = true;
    };

    // Access the internal deprecate function directly
    const definition = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const deprecate = definition();

    // Create a deprecated function
    const deprecatedFn = deprecate(() => "result", "testFn", "use newFn");

    // Call the deprecated function
    const result = deprecatedFn();

    // Verify the function still works
    expect(result).toBe("result");
    // Verify console.warn was called when available
    expect(warnCalled).toBe(true);

    // Restore console.warn
    console.warn = originalWarn;
  });
});