// Test case to detect the mutation in q.js
declare const ses: any;

describe("Q library SES environment handling", () => {
  it("should properly handle SES environment with ok() returning true", () => {
    // Create a mock SES environment where ok() returns true
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

    // In the original code, when ses.ok() returns true, it should call ses.makeQ
    // In the mutated code, the else block is empty so it won't call ses.makeQ
    // This is the key difference we're testing
    expect(mockSes.makeQ).toHaveBeenCalled();

    // Clean up
    if (originalSes) {
      (global as any).ses = originalSes;
    } else {
      delete (global as any).ses;
    }
  });
});