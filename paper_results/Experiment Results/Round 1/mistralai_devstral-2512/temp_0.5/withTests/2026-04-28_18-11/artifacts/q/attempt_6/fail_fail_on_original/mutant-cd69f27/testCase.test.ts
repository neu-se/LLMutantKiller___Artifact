// Test case to detect the mutation in q.js where the SES (Secure EcmaScript) environment handling is modified
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("SES environment handling", () => {
  it("should correctly handle SES environment and expose the Q global", () => {
    // Mock the SES environment
    const mockSes = {
      ok: () => true,
      makeQ: jest.fn(() => ({
        // Return a mock Q object that matches what the original code expects
        noConflict: () => {}
      }))
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

      // In the original code, ses.makeQ should be called when ses.ok() returns true
      // In the mutated code, ses.makeQ would not be called due to the empty else block
      expect(mockSes.makeQ).toHaveBeenCalled();
    } finally {
      // Restore the original global.ses
      (global as any).ses = originalSes;
    }
  });
});