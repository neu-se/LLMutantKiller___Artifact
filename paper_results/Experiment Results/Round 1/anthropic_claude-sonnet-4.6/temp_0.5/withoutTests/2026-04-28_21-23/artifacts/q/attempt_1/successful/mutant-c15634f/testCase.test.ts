import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function guard", () => {
  it("should not throw when console.warn is not a function", async () => {
    const originalWarn = console.warn;
    // Replace console.warn with a non-function to test the guard
    (console as any).warn = "not a function";
    
    try {
      // Q.allResolved is wrapped with deprecate(), which should check
      // typeof console.warn === "function" before calling it
      // Original: condition fails, no call to console.warn
      // Mutated: condition is `true`, tries to call "not a function" as a function -> throws
      const result = await Q.allResolved([Q(1), Q(2)]);
      expect(result).toBeDefined();
    } finally {
      console.warn = originalWarn;
    }
  });
});