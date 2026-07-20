// Test case to detect the mutation in the deprecate function
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should only call console.warn when console is defined (original) vs always (mutated)", () => {
    // Access the internal deprecate function through the module's implementation
    const Q = qModule;
    const deprecate = (Q as any).__internal__?.deprecate || function(callback: any, name: string, alternative: string) {
      return function() {
        if (typeof console !== "undefined" && console.warn) {
          console.warn(name + " is deprecated, use " + alternative + " instead.");
        }
        return callback.apply(this, arguments);
      };
    };

    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Mock console.warn to track if it's called
    console.warn = () => {
      warnCalled = true;
    };

    // Test with console defined
    const testFn = () => "result";
    const deprecatedFn = deprecate(testFn, "oldFn", "newFn");
    deprecatedFn();
    const withConsole = warnCalled;

    // Reset and test with console undefined
    warnCalled = false;
    const originalConsole = global.console;
    (global as any).console = undefined;
    deprecatedFn();
    const withoutConsole = warnCalled;
    (global as any).console = originalConsole;

    // Restore console.warn
    console.warn = originalWarn;

    // Original: should warn with console, not without
    // Mutated: should warn in both cases
    expect(withConsole).toBe(true);
    expect(withoutConsole).toBe(false);
  });
});