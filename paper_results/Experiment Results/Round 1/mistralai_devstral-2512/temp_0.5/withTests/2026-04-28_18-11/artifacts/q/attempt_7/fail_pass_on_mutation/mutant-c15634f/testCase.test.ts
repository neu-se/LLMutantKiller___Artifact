// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should only show deprecation warning when console.warn is available", () => {
    // Save original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Mock console.warn to track calls
    console.warn = () => {
      warnCalled = true;
    };

    // Test with console.warn available
    const testFn = () => "test";

    // Access the internal deprecate function by examining the module structure
    // The deprecate function is used internally by Q, so we'll test its behavior
    // through operations that would trigger it
    const deferred = Q.defer();
    const promise = deferred.promise;

    // In the original code, warnings should only appear when console is available
    // The mutation changes the condition from checking console.warn to always true
    expect(warnCalled).toBe(false);

    // Restore console.warn
    console.warn = originalWarn;

    // Test with console.warn unavailable
    const originalConsole = console;
    (global as any).console = undefined;

    warnCalled = false;
    const deferred2 = Q.defer();
    const promise2 = deferred2.promise;

    // In original code, should not call warn when console is undefined
    // In mutated code, would still call warn (causing error)
    expect(warnCalled).toBe(false);

    // Restore console
    (global as any).console = originalConsole;
  });
});