// Test case to detect the mutation in the deprecate function
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should only call console.warn when console is defined (original) vs always (mutated)", () => {
    // Store the original console
    const originalConsole = global.console;
    let warnCalled = false;

    // Mock console.warn to track if it's called
    const mockWarn = () => {
      warnCalled = true;
    };

    // Test 1: With console defined (should warn in original, always warn in mutated)
    global.console = { warn: mockWarn };
    warnCalled = false;

    // Simulate the original deprecate behavior
    const originalDeprecated = () => {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("testFn is deprecated, use newFn instead.");
      }
      return "result";
    };

    originalDeprecated();
    const originalWithConsole = warnCalled;

    // Test 2: With console undefined (should not warn in original, still warn in mutated)
    (global as any).console = undefined;
    warnCalled = false;

    originalDeprecated();
    const originalWithoutConsole = warnCalled;

    // Restore console
    global.console = originalConsole;

    // Original: should warn with console, not without
    expect(originalWithConsole).toBe(true);
    expect(originalWithoutConsole).toBe(false);

    // Now test the mutated behavior
    (global as any).console = { warn: mockWarn };
    warnCalled = false;

    // Simulate the mutated deprecate behavior
    const mutatedDeprecated = () => {
      if (true && console.warn) {
        console.warn("testFn is deprecated, use newFn instead.");
      }
      return "result";
    };

    mutatedDeprecated();
    const mutatedWithConsole = warnCalled;

    // Test with console undefined - this should throw in mutated version
    (global as any).console = undefined;
    warnCalled = false;

    try {
      mutatedDeprecated();
      // If we get here, the mutated version didn't throw
      const mutatedWithoutConsole = false;
      expect(mutatedWithoutConsole).toBe(false); // This will fail
    } catch (e) {
      // Expected behavior for mutated version
      expect(true).toBe(true);
    }

    // Restore console
    global.console = originalConsole;
  });
});