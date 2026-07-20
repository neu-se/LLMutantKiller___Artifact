// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("SES environment initialization", () => {
  it("should properly handle SES environment when ses.ok() returns false", () => {
    // Mock the SES environment with ok() returning false
    const mockSes = {
      ok: () => false,
      makeQ: undefined
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
    // and ses.makeQ remains undefined. In the mutated code, the return statement is
    // removed, causing the function to continue and set ses.makeQ.
    expect(mockSes.makeQ).toBeUndefined();

    // Restore the original environment
    global.ses = originalSes;
  });
});