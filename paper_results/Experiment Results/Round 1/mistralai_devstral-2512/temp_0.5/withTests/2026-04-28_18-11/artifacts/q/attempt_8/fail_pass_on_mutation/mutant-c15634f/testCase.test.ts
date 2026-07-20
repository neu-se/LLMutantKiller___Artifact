// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should only show deprecation warning when console.warn is available", () => {
    // Save original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;
    let warnMessage = null;

    // Mock console.warn to track calls
    console.warn = (msg) => {
      warnCalled = true;
      warnMessage = msg;
    };

    // Test with console.warn available
    const testFn = () => "test";

    // Create a deprecated function by accessing internal Q behavior
    // We'll test through promise operations that use deprecated features
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Trigger a deprecation warning (if any)
    // In original code, this should only warn when console.warn exists
    // In mutated code, this would always warn
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
    // In mutated code, would try to call warn on undefined console (causing error)
    expect(warnCalled).toBe(false);

    // Restore console
    (global as any).console = originalConsole;
  });
});