import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library SES environment", () => {
  it("should not execute ses.makeQ when ses.ok() returns false", () => {
    // Create a mock SES environment that will fail if makeQ is called
    let makeQCalled = false;
    const mockSes = {
      ok: () => false,
      makeQ: () => { makeQCalled = true; }
    };

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Force re-evaluation of the Q module to trigger SES path
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, makeQ should NOT be called when ses.ok() returns false
    // In the mutated code, makeQ WILL be called even when ses.ok() returns false
    expect(makeQCalled).toBe(false);

    // Clean up
    delete (global as any).ses;
  });
});