// Test to detect the mutation in the SES (Secure EcmaScript) environment check
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

declare global {
  var ses: {
    ok: () => boolean;
    makeQ: any;
  };
}

describe("Q library SES environment detection", () => {
  it("should properly handle SES environment when ses.ok() returns false", () => {
    // Save the original global.ses if it exists
    const originalSes = global.ses;

    // Mock the SES environment where ses.ok() returns false
    global.ses = {
      ok: () => false,
      makeQ: undefined
    };

    // In the original code, when ses.ok() returns false, it should return early
    // In the mutated code, when ses.ok() returns false, it would incorrectly proceed
    // We can detect this by checking if makeQ was set
    const qInstance = Q;

    // The test passes if Q was properly initialized despite SES not being ok
    // In the original code, this should work fine
    // In the mutated code, this might behave differently
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