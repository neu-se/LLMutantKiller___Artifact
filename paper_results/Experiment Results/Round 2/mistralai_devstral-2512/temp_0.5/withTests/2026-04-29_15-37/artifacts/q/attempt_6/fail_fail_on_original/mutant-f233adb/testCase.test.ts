// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly initialize Q when ses is not defined and window exists", () => {
    // Save original globals
    const globalAny: any = global;
    const originalSes = globalAny.ses;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;
    const originalQ = globalAny.Q;

    try {
      // Clean environment
      delete globalAny.ses;
      globalAny.window = {};
      globalAny.self = {};

      // Clear module cache and reload Q
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify Q was initialized on window
      expect(globalAny.window.Q).toBeDefined();
      expect(globalAny.window.Q).toBe(Q);
      expect(globalAny.self.Q).toBeDefined();

    } finally {
      // Restore original globals
      globalAny.ses = originalSes;
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
      globalAny.Q = originalQ;
    }
  });
});