// Test case to detect the mutation in q.js
declare const ses: any;

describe("Q library SES environment handling", () => {
  it("should handle SES environment initialization correctly", () => {
    // Create a mock SES environment
    let makeQCalled = false;
    const mockSes = {
      ok: () => true,
      makeQ: (q: any) => {
        makeQCalled = true;
      }
    };

    // Store the original ses if it exists
    const originalSes = (typeof ses !== 'undefined') ? ses : undefined;

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Load the Q library
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify that ses.makeQ was called when ses.ok() returns true
    // This should be true in the original code but false in the mutated code
    expect(makeQCalled).toBe(true);

    // Clean up
    if (originalSes) {
      (global as any).ses = originalSes;
    } else {
      delete (global as any).ses;
    }
  });
});