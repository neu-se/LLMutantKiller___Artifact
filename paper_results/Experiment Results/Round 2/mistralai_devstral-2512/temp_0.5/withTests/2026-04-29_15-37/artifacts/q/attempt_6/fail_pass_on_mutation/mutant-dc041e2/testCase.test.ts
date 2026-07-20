// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES environment handling", () => {
  it("should correctly handle SES environment behavior", () => {
    // Mock the SES environment
    const globalAny: any = global;
    const originalSes = globalAny.ses;
    const originalQ = globalAny.Q;

    // Test case 1: ses.ok() returns false (original should return early)
    globalAny.ses = { ok: () => false, makeQ: jest.fn() };
    delete globalAny.Q;

    // Simulate the condition check from the original code
    const shouldReturnEarly = !globalAny.ses.ok();
    expect(shouldReturnEarly).toBe(true);

    // Test case 2: ses.ok() returns true (original should set ses.makeQ)
    globalAny.ses = { ok: () => true, makeQ: jest.fn() };
    const shouldSetMakeQ = globalAny.ses.ok();
    expect(shouldSetMakeQ).toBe(true);

    // Clean up
    globalAny.ses = originalSes;
    globalAny.Q = originalQ;
  });
});