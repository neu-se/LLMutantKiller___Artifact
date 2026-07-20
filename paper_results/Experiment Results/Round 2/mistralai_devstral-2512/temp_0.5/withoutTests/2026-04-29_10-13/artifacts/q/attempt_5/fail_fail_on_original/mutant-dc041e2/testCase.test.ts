// Test to detect the mutation in the SES (Secure EcmaScript) environment check
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

declare global {
  var ses: {
    ok: () => boolean;
    makeQ: any;
  };
}

describe("Q library SES environment detection", () => {
  it("should behave differently based on ses.ok() return value", () => {
    // Test case 1: ses.ok() returns false (original behavior)
    (global as any).ses = {
      ok: () => false,
      makeQ: undefined
    };

    // Force re-evaluation of the Q module
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const qInstance1 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In original code, when ses.ok() returns false, it should return early
    // and NOT set ses.makeQ
    const makeQAfterFalse = (global as any).ses.makeQ;
    expect(makeQAfterFalse).toBeUndefined();

    // Test case 2: ses.ok() returns true (mutated behavior simulation)
    (global as any).ses = {
      ok: () => true,
      makeQ: undefined
    };

    // Force re-evaluation again
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const qInstance2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In original code, when ses.ok() returns true, it should set ses.makeQ
    // In mutated code, when ses.ok() returns false, it would incorrectly set ses.makeQ
    const makeQAfterTrue = (global as any).ses.makeQ;
    expect(makeQAfterTrue).not.toBeUndefined();
    expect(typeof makeQAfterTrue).toBe('function');

    // Clean up
    delete (global as any).ses;
  });
});