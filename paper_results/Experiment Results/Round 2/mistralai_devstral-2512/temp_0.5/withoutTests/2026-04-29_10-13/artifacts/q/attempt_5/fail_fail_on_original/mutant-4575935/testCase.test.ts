describe("Q library environment detection", () => {
  it("should correctly detect browser environment and expose Q globally", () => {
    // Save original environment
    const globalAny: any = global;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    try {
      // Setup browser-like environment
      globalAny.window = {};
      globalAny.self = {};

      // Clear module cache and any existing Q global
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      delete globalAny.Q;

      // Load Q library
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify Q was exposed as global in browser environment
      expect(globalAny.Q).toBeDefined();
      expect(typeof globalAny.Q).toBe("function");
      expect(typeof globalAny.Q.resolve).toBe("function");
    } finally {
      // Cleanup
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      delete globalAny.Q;
    }
  });
});