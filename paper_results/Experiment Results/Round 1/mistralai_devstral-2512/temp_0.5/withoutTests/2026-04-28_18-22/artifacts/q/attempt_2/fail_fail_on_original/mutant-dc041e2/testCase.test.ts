// Test case to detect the mutation in q.js
import * as qModule from "./q";

describe("Q library SES environment handling", () => {
  it("should handle SES environment correctly when ses.ok() returns false", () => {
    // Mock the SES environment
    const mockSes = {
      ok: () => false,
      makeQ: undefined
    };

    // Store the original ses
    const originalSes = (global as any).ses;
    (global as any).ses = mockSes;

    try {
      // Force re-evaluation of the module to test SES path
      delete require.cache[require.resolve("./q")];
      const Q = require("./q");

      // In the original code, when ses.ok() returns false, it should return early
      // and not set ses.makeQ. In the mutated code, it would set ses.makeQ.
      expect(mockSes.makeQ).toBeUndefined();

      // Verify Q is still functional
      const promise = Q.resolve(42);
      return promise.then((value: number) => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore original ses
      (global as any).ses = originalSes;
    }
  });
});