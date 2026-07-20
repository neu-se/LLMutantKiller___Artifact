// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly handle ses environment check", () => {
    // Simulate a ses environment
    const globalAny: any = global;
    const originalSes = globalAny.ses;

    // Setup mock ses object that should prevent Q initialization
    globalAny.ses = {
      ok: () => false
    };

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // This should not throw and should not initialize Q
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is not initialized on global when ses.ok() returns false
    expect(globalAny.Q).toBeUndefined();

    // Cleanup
    globalAny.ses = originalSes;
  });
});