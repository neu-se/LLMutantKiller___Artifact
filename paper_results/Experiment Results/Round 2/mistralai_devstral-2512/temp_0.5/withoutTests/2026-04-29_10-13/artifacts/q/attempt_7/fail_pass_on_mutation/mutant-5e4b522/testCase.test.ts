describe("Q library initialization", () => {
  it("should properly detect browser environment with window object", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    try {
      // Setup test environment - window defined but empty string (mutated condition)
      globalAny.window = "";
      delete globalAny.self;

      // Load Q - this should trigger the mutated path
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the mutated version, typeof window !== "" will be true
      // so it should try to expose Q on window (which is a string)
      // This should fail or behave differently than original
      expect(typeof globalAny.window).toBe("string");
      expect(globalAny.window.Q).toBeUndefined();

    } finally {
      // Restore original globals
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
    }
  });
});