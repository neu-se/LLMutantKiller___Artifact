// Test case to detect the mutation in q.js where the SES (Secure EcmaScript) environment handling is modified
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES environment handling", () => {
  it("should correctly handle SES environment with ses.ok() returning false", () => {
    // Mock the SES environment
    const mockSes = {
      ok: () => false,
      makeQ: jest.fn()
    };

    // Save the original global.ses if it exists
    const originalSes = global.ses;

    // Set up the mock SES environment
    global.ses = mockSes;

    // Load Q in the SES environment context
    // The original code should not call ses.makeQ when ses.ok() returns false
    // The mutated code would incorrectly proceed to the else branch
    try {
      // Re-require Q to ensure it runs the SES environment check
      // This is necessary because the module may have already been loaded
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, ses.makeQ should NOT be called when ses.ok() returns false
      // In the mutated code, ses.makeQ would be called incorrectly
      expect(mockSes.makeQ).not.toHaveBeenCalled();
    } finally {
      // Restore the original global.ses
      global.ses = originalSes;
    }
  });
});