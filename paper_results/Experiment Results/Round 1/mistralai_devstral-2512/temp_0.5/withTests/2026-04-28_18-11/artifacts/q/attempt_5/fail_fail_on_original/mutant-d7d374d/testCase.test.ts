// Test case to detect the mutation in the deprecate function
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should only call console.warn when console is defined (original) vs always (mutated)", () => {
    // Store the original console
    const originalConsole = global.console;
    let warnCalled = false;

    // Test 1: With console defined (should warn in original, always warn in mutated)
    global.console = {
      warn: () => {
        warnCalled = true;
      }
    };

    // Create a deprecated function
    const testFn = () => "result";
    const deprecatedFn = qModule.deprecate(testFn, "oldFn", "newFn");

    // Call it
    deprecatedFn();

    // In original code, this should be true (console is defined)
    // In mutated code, this should also be true (condition is always true)
    const withConsole = warnCalled;

    // Reset
    warnCalled = false;

    // Test 2: With console undefined (should not warn in original, still warn in mutated)
    global.console = undefined as any;

    // Call again
    deprecatedFn();

    // In original code, this should be false (console is undefined)
    // In mutated code, this should be true (condition is always true)
    const withoutConsole = warnCalled;

    // Restore console
    global.console = originalConsole;

    // Original: should warn with console, not without
    // Mutated: should warn in both cases
    expect(withConsole).toBe(true);
    expect(withoutConsole).toBe(false);
  });
});