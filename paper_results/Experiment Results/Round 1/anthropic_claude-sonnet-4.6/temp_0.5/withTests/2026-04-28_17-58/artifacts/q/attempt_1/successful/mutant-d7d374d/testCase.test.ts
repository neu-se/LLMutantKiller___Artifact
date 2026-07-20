import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function behavior when console is unavailable", () => {
  it("should not throw when console is undefined and a deprecated function is called", () => {
    const originalConsole = (global as any).console;
    
    try {
      // Remove console to simulate environment where console is undefined
      delete (global as any).console;
      
      // allResolved is wrapped with deprecate(), so calling it exercises the deprecate function
      // Original code: checks `typeof console !== "undefined"` before calling console.warn
      // Mutated code: uses `if (true &&` which will try to call console.warn unconditionally
      // When console is undefined, the mutated code will throw a TypeError
      expect(() => {
        Q.allResolved([Q(1), Q(2)]);
      }).not.toThrow();
    } finally {
      // Restore console
      (global as any).console = originalConsole;
    }
  });
});