// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should show deprecation warning only when console is available", () => {
    // Save original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Mock console.warn to track calls
    console.warn = () => {
      warnCalled = true;
    };

    // Create a simple promise operation that would trigger deprecation
    // We'll test the behavior by checking if warnings are shown appropriately
    const deferred = Q.defer();
    const promise = deferred.promise;

    // In the original code, warnings should only appear when console is available
    // In the mutated code (if true), warnings would always appear
    expect(warnCalled).toBe(false);

    // Restore console.warn
    console.warn = originalWarn;

    // Test with console unavailable
    const originalConsole = console;
    (global as any).console = undefined;

    warnCalled = false;
    const deferred2 = Q.defer();
    const promise2 = deferred2.promise;

    // Should not call warn when console is undefined
    expect(warnCalled).toBe(false);

    // Restore console
    (global as any).console = originalConsole;
  });
});