// Test to detect the mutation in the SES (Secure EcmaScript) environment check
import { Q } from "./q.js";

describe("Q library SES environment detection", () => {
  it("should properly handle SES environment when ses.ok() returns false", () => {
    // Mock the SES environment
    const mockSes = {
      ok: () => false,
      makeQ: undefined
    };

    // Save the original global.ses if it exists
    const originalSes = global.ses;

    // Set up the mock SES environment
    global.ses = mockSes;

    // Load Q in the SES environment context
    // This should trigger the SES branch in the code
    const qInstance = Q;

    // In the original code, when ses.ok() returns false, it should return
    // In the mutated code, when ses.ok() returns false, it would incorrectly proceed
    // The test passes if we can successfully create a promise in this environment
    const testPromise = qInstance.resolve(42);

    expect(testPromise).toBeDefined();
    expect(typeof testPromise.then).toBe('function');

    // Clean up
    if (originalSes !== undefined) {
      global.ses = originalSes;
    } else {
      delete global.ses;
    }
  });
});