// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should call console.warn when console is defined in the original version", () => {
    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;
    let warnMessage = null;

    // Mock console.warn to track if it's called
    console.warn = (message: string) => {
      warnCalled = true;
      warnMessage = message;
    };

    // Create a test function to deprecate
    const testFn = () => "test result";
    const deprecatedFn = Q.deprecate(testFn, "testFn", "newFn");

    // Call the deprecated function
    deprecatedFn();

    // Restore console.warn
    console.warn = originalWarn;

    // In the original code, console.warn should be called with the deprecation message
    expect(warnCalled).toBe(true);
    expect(warnMessage).toContain("testFn is deprecated, use newFn instead");
  });
});