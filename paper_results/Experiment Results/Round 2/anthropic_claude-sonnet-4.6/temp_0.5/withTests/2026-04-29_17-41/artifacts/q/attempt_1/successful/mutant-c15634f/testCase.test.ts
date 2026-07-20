import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function behavior", () => {
  it("should not throw when console.warn is not a function", () => {
    const originalWarn = console.warn;
    
    // Replace console.warn with a non-function value
    // Original code checks `typeof console.warn === "function"` before calling it
    // Mutated code uses `if (true)` and will attempt to call console.warn regardless
    (console as any).warn = "not a function";
    
    try {
      // Q.allResolved is wrapped with deprecate(), which calls console.warn
      // With original code: the check `typeof console.warn === "function"` prevents the call
      // With mutated code: `if (true)` skips the check, tries to call "not a function" as a function, throws TypeError
      expect(() => {
        Q.allResolved([Q(1), Q(2)]);
      }).not.toThrow();
    } finally {
      console.warn = originalWarn;
    }
  });
});