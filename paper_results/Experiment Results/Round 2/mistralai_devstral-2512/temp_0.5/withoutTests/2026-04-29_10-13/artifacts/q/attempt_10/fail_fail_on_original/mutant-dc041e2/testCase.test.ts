// Test to detect the mutation in the SES (Secure EcmaScript) environment check
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

declare global {
  var ses: {
    ok: () => boolean;
    makeQ: any;
  };
}

describe("Q library SES environment detection", () => {
  it("should have different behavior based on ses.ok() return value", () => {
    // Test case 1: ses.ok() returns false (original behavior)
    (global as any).ses = {
      ok: () => false,
      makeQ: undefined
    };

    // Track execution
    let makeQSetCount = 0;
    Object.defineProperty((global as any).ses, 'makeQ', {
      set: function(value) {
        makeQSetCount++;
      },
      get: function() {
        return undefined;
      },
      configurable: true
    });

    // Force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const qInstance1 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const countAfterFalse = makeQSetCount;

    // Test case 2: ses.ok() returns true
    (global as any).ses = {
      ok: () => true,
      makeQ: undefined
    };

    // Reset counter
    makeQSetCount = 0;

    // Force re-evaluation again
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const qInstance2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const countAfterTrue = makeQSetCount;

    // In original code:
    // - When ses.ok() returns false: countAfterFalse should be 0 (return branch)
    // - When ses.ok() returns true: countAfterTrue should be 1 (else branch)
    // In mutated code:
    // - When ses.ok() returns false: countAfterFalse would be 1 (else branch)
    // - When ses.ok() returns true: countAfterTrue would be 1 (else branch)
    expect(countAfterFalse).toBe(0);
    expect(countAfterTrue).toBe(1);

    // Clean up
    delete (global as any).ses;
  });
});