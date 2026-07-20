// Test case to detect the mutation in q.js
declare const ses: any;

describe("Q library SES environment handling", () => {
  it("should correctly handle SES environment initialization", () => {
    // Create a mock SES environment
    const mockSes = {
      ok: () => true,
      makeQ: jest.fn()
    };

    // Store the original ses if it exists
    const originalSes = (typeof ses !== 'undefined') ? ses : undefined;

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Load the Q library
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify that ses.makeQ was called with the Q definition
    expect(mockSes.makeQ).toHaveBeenCalled();

    // Clean up
    if (originalSes) {
      (global as any).ses = originalSes;
    } else {
      delete (global as any).ses;
    }
  });
});