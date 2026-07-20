// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("SES environment initialization", () => {
  it("should properly handle SES environment initialization", () => {
    // Mock the SES environment with ok() returning false
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

    // The key difference: In the original code, when ses.ok() returns false,
    // the function returns early and ses.makeQ remains undefined
    // In the mutated code, the return statement is removed, so the function continues
    // and would set ses.makeQ = definition (which is the behavior we want to detect)

    // Verify that ses.makeQ is still undefined (original behavior)
    expect(mockSes.makeQ).toBeUndefined();

    // Now test with ses.ok() returning true to ensure normal behavior
    mockSes.ok = () => true;
    jest.resetModules();
    require("../../../../../../../../../../../subject_repositories/q/q");
    expect(typeof mockSes.makeQ).toBe('function');

    // Restore the original environment
    (global as any).ses = originalSes;
  });
});