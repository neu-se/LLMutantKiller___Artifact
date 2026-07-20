// Test case to detect the mutation in q.js
declare const ses: any;

describe("Q library SES environment handling", () => {
  it("should expose Q globally when ses.ok() returns true", () => {
    // Create a mock SES environment where ok() returns true
    const mockSes = {
      ok: () => true,
      makeQ: jest.fn((q) => {
        // Store the Q reference that would be made available in SES
        (global as any).Q_from_ses = q;
      })
    };

    // Store the original ses if it exists
    const originalSes = (typeof ses !== 'undefined') ? ses : undefined;

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Load the Q library
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is available globally in the SES environment
    expect((global as any).Q_from_ses).toBeDefined();
    expect(typeof (global as any).Q_from_ses).toBe('function');

    // Clean up
    if (originalSes) {
      (global as any).ses = originalSes;
    } else {
      delete (global as any).ses;
    }
    delete (global as any).Q_from_ses;
  });
});