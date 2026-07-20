describe("Q library global exposure", () => {
  it("should expose Q on window when window is defined", () => {
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

      // Load Q in this environment
      const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // The module should expose Q on window when window is defined
      // In the original code, this happens in the <script> path
      // We need to check if window.Q exists after loading
      const windowQ = globalAny.window.Q;
      expect(windowQ).toBeDefined();
      expect(typeof windowQ).toBe("function");

      // Verify it's the actual Q library by testing basic functionality
      const deferred = windowQ.defer();
      expect(deferred).toBeDefined();
      expect(typeof deferred.resolve).toBe("function");

    } finally {
      // Restore original globals
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      globalAny.Q = originalQ;
    }
  });
});