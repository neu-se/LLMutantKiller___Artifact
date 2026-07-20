// Test to detect the mutation in the SES (Secure EcmaScript) environment check
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

declare global {
  var ses: {
    ok: () => boolean;
    makeQ: any;
  };
}

describe("Q library SES environment detection", () => {
  it("should return early when ses.ok() returns false", () => {
    // Save the original global.ses if it exists
    const originalSes = (global as any).ses;

    // Mock the SES environment where ses.ok() returns false
    (global as any).ses = {
      ok: () => false,
      makeQ: undefined
    };

    // Track whether the code executed the else branch
    let elseBranchExecuted = false;
    const originalMakeQ = (global as any).ses.makeQ;
    Object.defineProperty((global as any).ses, 'makeQ', {
      set: function(value) {
        elseBranchExecuted = true;
      },
      get: function() {
        return originalMakeQ;
      },
      configurable: true
    });

    // Force re-evaluation of the Q module in the SES environment context
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const qInstance = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, when ses.ok() returns false, it should return early
    // and NOT execute the else branch (elseBranchExecuted should remain false)
    // In the mutated code, when ses.ok() returns false, it would incorrectly
    // execute the else branch (elseBranchExecuted would become true)
    expect(elseBranchExecuted).toBe(false);

    // Clean up
    if (originalSes !== undefined) {
      (global as any).ses = originalSes;
    } else {
      delete (global as any).ses;
    }
  });
});