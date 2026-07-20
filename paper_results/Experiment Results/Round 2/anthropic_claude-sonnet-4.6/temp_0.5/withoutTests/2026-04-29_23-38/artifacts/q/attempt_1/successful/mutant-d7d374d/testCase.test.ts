import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function behavior when console is undefined", () => {
  it("should not throw when console is undefined and a deprecated function is called", async () => {
    const originalConsole = global.console;
    
    try {
      // Temporarily remove console to simulate environment without console
      (global as any).console = undefined;
      
      // allResolved is a deprecated function that uses the deprecate wrapper
      // In original code: checks typeof console !== "undefined" before calling console.warn
      // In mutated code: always tries to call console.warn, which will throw if console is undefined
      const promise = Q.allResolved([Q(1), Q(2)]);
      const result = await promise;
      
      // Should reach here without throwing
      expect(result).toBeDefined();
      expect(result.length).toBe(2);
    } finally {
      // Restore console
      global.console = originalConsole;
    }
  });
});