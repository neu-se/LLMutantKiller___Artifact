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

      // Load Q in this environment by evaluating the source
      const fs = require('fs');
      const path = require('path');
      const qSource = fs.readFileSync(path.resolve('../../../../../../../../../../../subject_repositories/q/q.js'), 'utf8');
      eval(qSource);

      // Verify Q was exposed on window
      expect(globalAny.window.Q).toBeDefined();
      expect(typeof globalAny.window.Q).toBe("function");

      // Verify it's the actual Q library by testing basic functionality
      const deferred = globalAny.window.Q.defer();
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