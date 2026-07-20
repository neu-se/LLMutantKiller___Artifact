// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("SES environment initialization", () => {
  it("should not modify ses.makeQ when ses.ok() returns false", () => {
    // Mock the SES environment with ok() returning false
    const mockSes = {
      ok: () => false,
      makeQ: "initial_value"
    };

    // Save the original ses object
    const originalSes = global.ses;

    // Set up the mock environment
    global.ses = mockSes;

    // Clear the module cache to reload Q with our mock environment
    jest.resetModules();

    // Re-import Q to ensure it's loaded with the mocked environment
    const QReloaded = require("../../../../../../../../../../../subject_repositories/q/q");

    // In the original code, when ses.ok() returns false, the function returns early
    // and ses.makeQ remains unchanged. In the mutated code, the return statement is
    // removed, causing the function to continue and potentially modify ses.makeQ.
    expect(mockSes.makeQ).toBe("initial_value");

    // Restore the original environment
    global.ses = originalSes;
  });
});