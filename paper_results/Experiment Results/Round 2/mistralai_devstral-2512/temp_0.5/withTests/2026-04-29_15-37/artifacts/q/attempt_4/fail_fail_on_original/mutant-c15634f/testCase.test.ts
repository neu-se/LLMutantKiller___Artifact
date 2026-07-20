const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should conditionally log deprecation warning based on console.warn availability", () => {
    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Test case 1: console.warn is available
    console.warn = () => {
      warnCalled = true;
    };

    // Create a deprecated function
    const deprecatedFn = Q.deprecate(() => "result", "testFn", "use newFn");

    // Call the deprecated function
    const result = deprecatedFn();

    // Verify the function still works
    expect(result).toBe("result");
    // Verify console.warn was called when available
    expect(warnCalled).toBe(true);

    // Test case 2: console.warn is not available
    warnCalled = false;
    delete (console as any).warn;

    // Call the deprecated function again
    const result2 = deprecatedFn();

    // Verify the function still works
    expect(result2).toBe("result");
    // Verify console.warn was not called when unavailable
    expect(warnCalled).toBe(false);

    // Restore console.warn
    console.warn = originalWarn;
  });
});