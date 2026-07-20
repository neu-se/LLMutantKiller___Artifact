describe("Q library browser environment detection", () => {
  it("should expose Q globally when window or self is defined", () => {
    // Save original environment
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    try {
      // Setup browser-like environment
      globalAny.window = {};
      globalAny.self = {};

      // Clear module cache and any existing Q global
      const modulePath = "../../../../../../../../../../../subject_repositories/q/q.js";
      delete require.cache[require.resolve(modulePath)];
      delete globalAny.Q;

      // Load Q library - this should trigger the browser path
      const Q = require(modulePath);

      // Verify Q was exposed as global
      expect(globalAny.Q).toBeDefined();
      expect(globalAny.Q).toBe(Q);

      // Verify it's the Q library
      expect(typeof globalAny.Q.resolve).toBe("function");
      expect(typeof globalAny.Q.reject).toBe("function");
    } finally {
      // Cleanup
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      delete globalAny.Q;
    }
  });
});