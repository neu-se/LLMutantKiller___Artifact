// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("SES environment initialization", () => {
  it("should return early when ses.ok() returns false", () => {
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
    // We'll verify that ses.makeQ is still undefined (original behavior)
    expect(mockSes.makeQ).toBeUndefined();

    // Now test the behavior when ses.ok() returns true
    mockSes.ok = () => true;
    jest.resetModules();
    require("../../../../../../../../../../../subject_repositories/q/q");
    // In both original and mutated code, ses.makeQ should be set to a function when ok() returns true
    expect(typeof mockSes.makeQ).toBe('function');

    // Restore the original environment
    global.ses = originalSes;
  });
});