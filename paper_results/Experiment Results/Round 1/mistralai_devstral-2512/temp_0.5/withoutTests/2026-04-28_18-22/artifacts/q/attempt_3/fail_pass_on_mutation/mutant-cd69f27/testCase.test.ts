import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library SES environment handling", () => {
  it("should not call ses.makeQ when ses.ok() returns false", () => {
    // Create a mock SES environment
    const mockSes = {
      ok: () => false,
      makeQ: jest.fn()
    };

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Force re-evaluation of the Q module to trigger SES path
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, ses.makeQ should NOT be called when ses.ok() returns false
    // In the mutated code, ses.makeQ WILL be called even when ses.ok() returns false
    expect(mockSes.makeQ).not.toHaveBeenCalled();

    // Clean up
    delete (global as any).ses;
  });
});