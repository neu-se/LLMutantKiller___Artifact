// Test to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization with ses", () => {
  it("should return early when ses.ok() returns false", () => {
    // Save original ses if it exists
    const originalSes = (global as any).ses;

    // Create a mock ses object that returns false from ok()
    const mockSes = {
      ok: () => false,
      makeQ: undefined
    };

    try {
      // Set up mock ses environment
      (global as any).ses = mockSes;

      // Clear require cache and re-import to trigger initialization
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, when ses.ok() returns false, it should return early
      // and not set ses.makeQ. In the mutated code, the block is empty so nothing happens.
      // We can detect this by checking if Q was actually initialized
      expect(Q).toBeUndefined();

    } finally {
      // Restore original ses
      (global as any).ses = originalSes;
    }
  });
});