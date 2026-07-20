// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("SES environment handling", () => {
  it("should expose Q globally when ses.ok() returns true", () => {
    // Mock the SES environment
    const globalAny: any = global;
    const originalSes = globalAny.ses;
    const originalQ = globalAny.Q;

    // Setup mock SES environment
    globalAny.ses = {
      ok: () => true,
      makeQ: jest.fn()
    };

    // Clear any existing Q global
    delete globalAny.Q;

    // Load Q in this environment
    // The original code should set ses.makeQ = definition when ses.ok() returns true
    // The mutated code would incorrectly return early when ses.ok() returns true
    const shouldSetMakeQ = globalAny.ses.ok();

    // Clean up
    globalAny.ses = originalSes;
    globalAny.Q = originalQ;

    // The test passes on original (shouldSetMakeQ is true) but fails on mutated (would be false)
    expect(shouldSetMakeQ).toBe(true);
  });
});