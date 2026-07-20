// Test case to detect the mutation in q.js where the SES (Secure EcmaScript) environment handling is modified
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("SES environment handling", () => {
  it("should correctly handle SES environment with ses.ok() returning false", () => {
    // Mock the SES environment
    const mockSes = {
      ok: () => false,
      makeQ: jest.fn()
    };

    // Save the original global.ses if it exists
    const originalSes = (global as any).ses;

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Clear the require cache to ensure fresh loading
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // Load Q in the SES environment context
    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, ses.makeQ should NOT be called when ses.ok() returns false
      // In the mutated code, ses.makeQ would be called incorrectly due to the missing return
      expect(mockSes.makeQ).not.toHaveBeenCalled();
    } finally {
      // Restore the original global.ses
      (global as any).ses = originalSes;
    }
  });
});