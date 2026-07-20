// Test case to detect the mutation in q.js
describe("Q library initialization", () => {
  it("should properly initialize in browser-like environment with window", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    try {
      // Setup browser-like environment with window but no self
      globalAny.window = {};
      delete globalAny.self;
      delete globalAny.Q;

      // Clear the module cache to force fresh load
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      // Load Q - this should expose Q on window in original code
      const Q = require(modulePath);

      // In original code, Q should be exposed on window when window is defined
      // In mutated code (false || typeof self !== "undefined"), it won't be
      expect(globalAny.window.Q).toBeDefined();
      expect(globalAny.window.Q).toBe(Q);

    } finally {
      // Restore original globals
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      globalAny.Q = originalQ;
    }
  });
});