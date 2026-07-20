// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("SES environment handling", () => {
  it("should not set ses.makeQ when ses.ok() returns false", () => {
    // Mock the SES environment
    const mockSes = {
      ok: () => false,
      makeQ: undefined
    };

    // Save the original ses object
    const originalSes = (global as any).ses;

    // Set up the mock environment
    (global as any).ses = mockSes;

    // Clear the module cache to reload Q with our mock environment
    jest.resetModules();

    // Re-import Q to ensure it's loaded with the mocked environment
    const { Q: QReloaded } = require("../../../../../../../../../../../subject_repositories/q/q");

    // Verify that ses.makeQ is still undefined when ses.ok() returns false
    // The mutation changes the behavior by removing the return statement,
    // which would cause the function to continue and potentially set ses.makeQ
    expect(mockSes.makeQ).toBeUndefined();

    // Restore the original environment
    (global as any).ses = originalSes;
  });
});