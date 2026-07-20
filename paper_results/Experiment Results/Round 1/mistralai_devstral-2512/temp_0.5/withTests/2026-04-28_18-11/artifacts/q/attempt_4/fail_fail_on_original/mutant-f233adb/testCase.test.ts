// Test to detect the mutation in q.js
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library initialization", () => {
  it("should properly handle ses environment detection", () => {
    // Save original ses if it exists
    const originalSes = (global as any).ses;

    // Create a mock ses object that should trigger the original code path
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

      // Verify that ses.makeQ was set by the original code
      expect(mockSes.makeQ).toBeDefined();
      expect(typeof mockSes.makeQ).toBe("function");

      // Verify Q is properly initialized
      expect(Q).toBeDefined();
      expect(typeof Q).toBe("function");

    } finally {
      // Restore original ses
      (global as any).ses = originalSes;
    }
  });
});