// Test case to detect the mutation in q.js where the SES (Secure EcmaScript) environment handling is modified
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("SES environment handling", () => {
  it("should correctly handle SES environment and verify Q is defined", () => {
    // Mock the SES environment
    const mockSes = {
      ok: () => true,
      makeQ: jest.fn(() => {
        // Return the actual Q object that the module creates
        const Q = qModule;
        return Q;
      })
    };

    // Save the original global.ses if it exists
    const originalSes = (global as any).ses;

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Clear the require cache to ensure fresh loading
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // Load Q in the SES environment context
    try {
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, ses.makeQ should be called when ses.ok() returns true
      // In the mutated code, ses.makeQ would not be called due to the empty else block
      expect(mockSes.makeQ).toHaveBeenCalled();

      // Also verify Q is properly defined
      expect(Q).toBeDefined();
      expect(typeof Q).toBe('function');
    } finally {
      // Restore the original global.ses
      (global as any).ses = originalSes;
    }
  });
});