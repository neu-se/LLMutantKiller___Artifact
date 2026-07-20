// Test case to detect the mutation in q.js
declare const ses: any;

describe("Q library SES environment handling", () => {
  it("should return early when ses.ok() returns false", () => {
    // Create a mock SES environment where ok() returns false
    let executionContinued = false;
    const mockSes = {
      ok: () => false,
      makeQ: (q: any) => {
        executionContinued = true;
      }
    };

    // Store the original ses if it exists
    const originalSes = (typeof ses !== 'undefined') ? ses : undefined;

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Load the Q library
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, when ses.ok() returns false, it should return early
    // and NOT execute the else block. In the mutated code, the empty if block
    // will allow execution to continue to the else block.
    // We verify this by checking if executionContinued remains false
    expect(executionContinued).toBe(false);

    // Clean up
    if (originalSes) {
      (global as any).ses = originalSes;
    } else {
      delete (global as any).ses;
    }
  });
});