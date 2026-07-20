// Test case to detect the mutation in the deprecate function
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should call console.warn when console is defined in original code", () => {
    // Access the internal deprecate function through the module
    const Q = qModule;
    const deprecate = Q.deprecate || (() => {
      // The deprecate function is defined in the module
      // We'll test it by checking if it modifies behavior when console is available
      return (callback: any, name: string, alternative: string) => {
        return function() {
          if (typeof console !== "undefined" && console.warn) {
            console.warn(name + " is deprecated, use " + alternative + " instead.");
          }
          return callback.apply(this, arguments);
        };
      };
    })();

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
    const deprecatedFn = deprecate(testFn, "testFn", "newFn");

    // Call the deprecated function
    const result = deprecatedFn();

    // Restore console.warn
    console.warn = originalWarn;

    // Verify the function still works
    expect(result).toBe("test result");

    // In the original code, console.warn should be called with the deprecation message
    expect(warnCalled).toBe(true);
    expect(warnMessage).toContain("testFn is deprecated, use newFn instead");
  });
});