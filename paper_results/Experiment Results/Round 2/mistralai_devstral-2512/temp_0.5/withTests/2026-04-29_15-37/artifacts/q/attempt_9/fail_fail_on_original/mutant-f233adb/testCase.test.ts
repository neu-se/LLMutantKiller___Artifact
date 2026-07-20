// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly handle ses environment and fall through to window initialization", () => {
    // Save original globals
    const globalAny: any = global;
    const originalSes = globalAny.ses;
    const originalWindow = globalAny.window;
    const originalQ = globalAny.Q;

    try {
      // Setup environment where ses exists but ok() returns false
      globalAny.ses = { ok: () => false };
      globalAny.window = {};

      // Force reload of Q module
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code: when ses.ok() returns false, should fall through to window initialization
      // In mutated code: empty if block prevents fall-through, so window.Q remains undefined
      expect(globalAny.window.Q).toBeDefined();

    } finally {
      // Restore original globals
      globalAny.ses = originalSes;
      globalAny.window = originalWindow;
      globalAny.Q = originalQ;
    }
  });
});