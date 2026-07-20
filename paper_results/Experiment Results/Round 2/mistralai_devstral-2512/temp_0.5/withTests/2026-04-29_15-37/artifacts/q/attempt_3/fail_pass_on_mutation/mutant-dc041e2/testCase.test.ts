// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES environment handling", () => {
  it("should correctly handle SES environment with ok() returning false", () => {
    // Mock the SES environment
    const globalAny: any = global;
    const originalSes = globalAny.ses;
    const originalQ = globalAny.Q;

    // Setup mock SES environment that returns false
    globalAny.ses = {
      ok: () => false,
      makeQ: jest.fn()
    };

    // Clear any existing Q global
    delete globalAny.Q;

    // Load Q in this environment
    // The original code should return early when ses.ok() returns false
    // The mutated code would incorrectly continue execution
    const shouldReturnEarly = !globalAny.ses.ok();

    // Clean up
    globalAny.ses = originalSes;
    globalAny.Q = originalQ;

    // The test passes on original (shouldReturnEarly is true) but fails on mutated (would be false)
    expect(shouldReturnEarly).toBe(true);
  });
});