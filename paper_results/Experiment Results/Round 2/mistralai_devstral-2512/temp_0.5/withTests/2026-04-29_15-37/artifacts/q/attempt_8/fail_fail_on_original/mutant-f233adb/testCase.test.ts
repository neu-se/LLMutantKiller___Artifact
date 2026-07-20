// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization in browser environment", () => {
  it("should initialize Q on window when ses is not available", () => {
    // Save original globals
    const globalAny: any = global;
    const originalSes = globalAny.ses;
    const originalWindow = globalAny.window;

    try {
      // Simulate browser environment without ses
      delete globalAny.ses;
      globalAny.window = {};

      // Force reload of Q module
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code, Q should be initialized on window
      // In mutated code, the empty if block prevents this
      expect(globalAny.window.Q).toBe(Q);

    } finally {
      // Restore original globals
      globalAny.ses = originalSes;
      globalAny.window = originalWindow;
    }
  });
});