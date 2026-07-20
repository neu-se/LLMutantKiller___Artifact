// Test case to detect the mutation in the deprecate function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should only warn when console.warn is available", () => {
    // Save original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Mock console.warn to track calls
    console.warn = () => {
      warnCalled = true;
    };

    // Test with console.warn available
    const testFn = () => "test";

    // Create a scenario that would trigger deprecation
    // We'll use Q.allResolved which is deprecated
    const promise = Q.allResolved([Q(1), Q(2)]);

    // In original code, this should call warn
    // In mutated code, this would also call warn
    expect(warnCalled).toBe(true);

    // Restore console.warn
    console.warn = originalWarn;

    // Test with console.warn unavailable
    const originalConsole = console;
    (global as any).console = undefined;

    warnCalled = false;

    // Try the same operation without console
    // In original code, this should not throw
    // In mutated code, this would throw (trying to access console.warn on undefined)
    expect(() => {
      Q.allResolved([Q(1), Q(2)]);
    }).not.toThrow();

    // Restore console
    (global as any).console = originalConsole;
  });
});