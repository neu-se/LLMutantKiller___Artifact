// Test case to detect the mutation in q.js
import { Q } from "./q";

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
      // Load Q in a fresh context to test the SES path
      // We need to simulate the module loading behavior
      const moduleExports = {};
      const module = { exports: moduleExports };

      // Execute the Q definition function
      const definition = require("./q").__definition__;
      const QInstance = definition();

      // In the original code, when ses.ok() returns false, it should return early
      // and not set ses.makeQ. In the mutated code, it would set ses.makeQ.
      expect(mockSes.makeQ).toBeUndefined();

      // Verify Q is still functional
      const promise = QInstance.resolve(42);
      return promise.then(value => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore original ses
      (global as any).ses = originalSes;
    }
  });
});