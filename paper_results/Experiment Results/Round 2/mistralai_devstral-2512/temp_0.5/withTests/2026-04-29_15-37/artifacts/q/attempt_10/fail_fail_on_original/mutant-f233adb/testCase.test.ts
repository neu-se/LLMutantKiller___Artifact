// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly initialize Q when ses is undefined and window is available", () => {
    // Save original globals
    const globalAny: any = global;
    const originalSes = globalAny.ses;
    const originalWindow = globalAny.window;
    const originalSelf = globalAny.self;

    try {
      // Clean environment - no ses, but window exists
      delete globalAny.ses;
      globalAny.window = {};
      globalAny.self = {};

      // Force reload of Q module
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify Q was initialized on window
      // Original code: should initialize Q on window
      // Mutated code: empty if block prevents initialization
      expect(globalAny.window.Q).toBe(Q);

    } finally {
      // Restore original globals
      globalAny.ses = originalSes;
      globalAny.window = originalWindow;
      globalAny.self = originalSelf;
    }
  });
});