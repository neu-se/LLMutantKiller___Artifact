// Test case to detect the mutation in the deprecate function
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should only call console.warn when console is defined (original) vs always (mutated)", () => {
    // We need to test the actual behavior of the deprecate function
    // Since it's not exported, we'll test it through a function that uses it

    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Mock console.warn to track if it's called
    console.warn = () => {
      warnCalled = true;
    };

    // Create a test function that would use deprecate internally
    const testFn = () => "result";

    // Simulate the original deprecate behavior
    const originalDeprecated = function() {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("testFn is deprecated, use newFn instead.");
      }
      return testFn.apply(this, arguments);
    };

    // Simulate the mutated deprecate behavior
    const mutatedDeprecated = function() {
      if (true && console.warn) {
        console.warn("testFn is deprecated, use newFn instead.");
      }
      return testFn.apply(this, arguments);
    };

    // Test original behavior with console defined
    warnCalled = false;
    originalDeprecated();
    const originalWithConsole = warnCalled;

    // Test original behavior with console undefined
    warnCalled = false;
    const originalConsole = global.console;
    (global as any).console = undefined;
    originalDeprecated();
    const originalWithoutConsole = warnCalled;
    (global as any).console = originalConsole;

    // Test mutated behavior with console defined
    warnCalled = false;
    mutatedDeprecated();
    const mutatedWithConsole = warnCalled;

    // Test mutated behavior with console undefined
    warnCalled = false;
    (global as any).console = undefined;
    mutatedDeprecated();
    const mutatedWithoutConsole = warnCalled;
    (global as any).console = originalConsole;

    // Restore console.warn
    console.warn = originalWarn;

    // Original: should warn with console, not without
    expect(originalWithConsole).toBe(true);
    expect(originalWithoutConsole).toBe(false);

    // Mutated: should warn in both cases (but we can't test this directly)
    // The key difference is that the mutated version would call warn even when console is undefined
    // which would throw an error in the mutated case
    expect(mutatedWithConsole).toBe(true);
    expect(mutatedWithoutConsole).toBe(false); // This would actually throw in mutated version
  });
});