import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

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

      // Force re-evaluation of Q in this environment
      // This will trigger the <script> path in q.js
      eval(require("fs").readFileSync("../../../../../../../../../../../subject_repositories/q/q.js", "utf-8"));

      // Verify Q was exposed on window
      expect(globalAny.window.Q).toBeDefined();
      expect(typeof globalAny.window.Q).toBe("function");

      // Verify it's the actual Q library
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