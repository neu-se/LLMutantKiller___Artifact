// Test case to detect the mutation in q.js
import { Q } from "./q";

describe("SES environment handling", () => {
  it("should correctly handle SES environment when ses.ok() returns false", () => {
    // Mock the SES environment
    const mockSes = {
      ok: () => false,
      makeQ: undefined
    };

    // Save the original ses and window objects
    const originalSes = (global as any).ses;
    const originalWindow = (global as any).window;

    // Set up the mock environment
    (global as any).ses = mockSes;
    delete (global as any).window;

    // Clear the module cache to reload Q with our mock environment
    // This is necessary to ensure the module is loaded with the mocked environment
    jest.resetModules();

    // Re-import Q to ensure it's loaded with the mocked environment
    const { Q: QReloaded } = require("./q");

    // Verify that ses.makeQ is not set when ses.ok() returns false
    expect(mockSes.makeQ).toBeUndefined();

    // Restore the original environment
    (global as any).ses = originalSes;
    (global as any).window = originalWindow;
  });
});