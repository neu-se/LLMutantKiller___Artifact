// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library SES environment handling", () => {
  it("should handle SES environment correctly when ses.ok() returns false", () => {
    // Mock the SES environment with ok() returning false
    const mockSes = {
      ok: () => false,
      makeQ: undefined
    };

    // Store the original ses
    const originalSes = (global as any).ses;
    (global as any).ses = mockSes;

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    try {
      // Re-import Q to test the SES path
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, when ses.ok() returns false, it should return early
      // and not set ses.makeQ. In the mutated code, it would set ses.makeQ.
      // This is the key assertion that will fail on the mutated code
      expect(mockSes.makeQ).toBeUndefined();

      // Verify Q is still functional
      return Q.resolve(42).then((value: number) => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore original ses
      (global as any).ses = originalSes;
    }
  });
});