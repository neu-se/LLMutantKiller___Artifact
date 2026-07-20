// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly handle the ses environment check and window initialization", () => {
    // Simulate environment where ses is defined but not ok
    const globalAny: any = global;
    const originalSes = globalAny.ses;
    const originalWindow = globalAny.window;
    const originalQ = globalAny.Q;

    // Setup mock ses that returns false from ok()
    globalAny.ses = {
      ok: () => false,
      makeQ: undefined
    };
    globalAny.window = {};

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In original code, when ses.ok() returns false, it should fall through to window initialization
    // In mutated code, the empty if block will prevent window initialization
    expect(globalAny.window.Q).toBeDefined();
    expect(globalAny.window.Q).toBe(Q);

    // Cleanup
    globalAny.ses = originalSes;
    globalAny.window = originalWindow;
    globalAny.Q = originalQ;
  });
});