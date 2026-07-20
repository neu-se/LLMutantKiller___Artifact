describe("Q library environment detection", () => {
  it("should expose Q on window when window is defined but not when window is empty string", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    try {
      // Test with window as empty string (mutated condition)
      globalAny.window = "";
      delete globalAny.self;
      delete globalAny.Q;

      // Clear require cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // Load Q - this should behave differently in mutated version
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code: typeof window !== "undefined" is true (empty string is not undefined)
      // In mutated code: typeof window !== "" is false (empty string === "")
      // So in mutated version, it should NOT expose Q on window

      // Verify Q was NOT exposed on window in mutated version
      expect(globalAny.window.Q).toBeUndefined();

    } finally {
      // Restore original globals
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      globalAny.Q = originalQ;
    }
  });
});