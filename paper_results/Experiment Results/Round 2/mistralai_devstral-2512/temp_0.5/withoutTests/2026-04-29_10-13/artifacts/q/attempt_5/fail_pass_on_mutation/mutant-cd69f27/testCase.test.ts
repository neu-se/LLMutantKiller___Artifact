// Test case to detect the mutation in q.js
declare const ses: any;

describe("Q library SES environment handling", () => {
  it("should correctly handle SES environment initialization with ok() returning false", () => {
    // Create a mock SES environment where ok() returns false
    const mockSes = {
      ok: () => false,
      makeQ: jest.fn()
    };

    // Store the original ses if it exists
    const originalSes = (typeof ses !== 'undefined') ? ses : undefined;

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Load the Q library
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, when ses.ok() returns false, it should return early
    // and NOT call ses.makeQ. In the mutated code, it will continue to the else
    // block and call ses.makeQ even when ok() returns false.
    expect(mockSes.makeQ).not.toHaveBeenCalled();

    // Clean up
    if (originalSes) {
      (global as any).ses = originalSes;
    } else {
      delete (global as any).ses;
    }
  });
});