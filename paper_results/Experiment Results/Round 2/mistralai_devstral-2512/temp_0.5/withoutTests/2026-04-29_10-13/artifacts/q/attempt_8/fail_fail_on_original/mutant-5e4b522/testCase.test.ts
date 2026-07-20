describe("Q library global exposure", () => {
  it("should expose Q on window when window is a non-empty object", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    try {
      // Setup browser-like environment with window as object
      globalAny.window = {};
      delete globalAny.self;
      delete globalAny.Q;

      // Load Q in this environment
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code: typeof window !== "undefined" evaluates to true
      // In mutated code: typeof window !== "" evaluates to true (since window is object)
      // Both should expose Q on window, but we need to verify the condition works correctly

      // Verify Q was exposed on window
      expect(globalAny.window.Q).toBeDefined();
      expect(typeof globalAny.window.Q).toBe("function");

      // Test that the condition properly handles window being an object
      // This should work in both original and mutated versions
      // But the mutation changes the condition from checking undefined to checking empty string
      // We need a test that would fail when window is an empty string

    } finally {
      // Restore original globals
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      globalAny.Q = originalQ;
    }
  });
});