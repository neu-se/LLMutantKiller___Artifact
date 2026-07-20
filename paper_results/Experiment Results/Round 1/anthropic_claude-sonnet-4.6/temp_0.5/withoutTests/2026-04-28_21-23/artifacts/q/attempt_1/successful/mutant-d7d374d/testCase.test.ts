import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function behavior", () => {
  it("should not throw when console is undefined in the original code but should behave differently in mutated code", async () => {
    // Save original console
    const originalConsole = global.console;
    
    try {
      // Temporarily make console undefined to test the guard condition
      // Original: if (typeof console !== "undefined" && ...) - skips warn
      // Mutated: if (true && ...) - tries to call console.warn, throws TypeError
      
      // We need to detect whether the code checks typeof console or uses true
      // By setting console to undefined and calling a deprecated function
      (global as any).console = undefined;
      
      let threw = false;
      try {
        // allResolved is deprecated and calls the deprecate wrapper
        // which should trigger the console.warn path
        await Q.allResolved([Q(1), Q(2)]);
      } catch (e) {
        threw = true;
      }
      
      // In original code: typeof console !== "undefined" is false when console is undefined
      // so it skips the warn block - no error thrown
      // In mutated code: true && ... proceeds to call console.warn on undefined - throws TypeError
      expect(threw).toBe(false);
    } finally {
      // Restore console
      global.console = originalConsole;
    }
  });
});