// Test to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library ses environment handling", () => {
  it("should set ses.makeQ when ses.ok() returns true", () => {
    // Save original ses if it exists
    const originalSes = (global as any).ses;

    // Create a mock ses object that returns true from ok()
    const mockSes = {
      ok: () => true,
      makeQ: undefined
    };

    try {
      // Set up mock ses environment
      (global as any).ses = mockSes;

      // Clear require cache and re-import to trigger initialization
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, when ses.ok() returns true, ses.makeQ should be set
      // In the mutated code, the block is empty so ses.makeQ remains undefined
      expect(mockSes.makeQ).toBeDefined();
      expect(typeof mockSes.makeQ).toBe("function");

      // Also verify Q is properly initialized
      expect(Q).toBeDefined();
      expect(typeof Q).toBe("function");

    } finally {
      // Restore original ses
      (global as any).ses = originalSes;
    }
  });
});