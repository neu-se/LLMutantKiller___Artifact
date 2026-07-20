describe("Q library global exposure", () => {
  it("should expose Q as global in browser environment", () => {
    // Save original globals
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    try {
      // Set up browser-like environment
      globalAny.window = {};
      globalAny.self = {};

      // Clear module cache
      const modulePath = "../../../../../../../../../../../subject_repositories/q/q.js";
      delete require.cache[require.resolve(modulePath)];

      // Require Q - this should expose it as global in original code
      const Q = require(modulePath);

      // In original code, Q should be exposed as global
      // In mutated code, it won't be because the condition is always false
      expect(globalAny.Q).toBeDefined();
      expect(globalAny.Q).toBe(Q);

      // Verify it's the actual Q library
      expect(typeof globalAny.Q.resolve).toBe("function");
    } finally {
      // Cleanup
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      globalAny.Q = originalQ;
    }
  });
});