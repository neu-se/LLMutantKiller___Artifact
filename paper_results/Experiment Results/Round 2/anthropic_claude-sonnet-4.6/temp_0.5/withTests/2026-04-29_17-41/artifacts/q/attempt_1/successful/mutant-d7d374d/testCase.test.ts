import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function console check", () => {
  it("should not throw when console is undefined and a deprecated function is called", () => {
    const originalConsole = (global as any).console;
    
    try {
      // Remove console from global to simulate environment where console is undefined
      delete (global as any).console;
      
      // allResolved is wrapped with deprecate() in q.js
      // Calling it should not throw even when console is undefined
      // In the original code: if (typeof console !== "undefined" && ...) - skips warn
      // In the mutated code: if (true && ...) - tries console.warn, throws TypeError
      expect(() => {
        Q.allResolved([Q(1), Q(2)]);
      }).not.toThrow();
    } finally {
      // Restore console
      (global as any).console = originalConsole;
    }
  });
});