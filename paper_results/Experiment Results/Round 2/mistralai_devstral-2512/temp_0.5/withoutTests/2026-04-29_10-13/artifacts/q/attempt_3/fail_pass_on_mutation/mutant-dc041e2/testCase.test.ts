// Test to detect the mutation in the SES (Secure EcmaScript) environment check
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

declare global {
  var ses: {
    ok: () => boolean;
    makeQ: any;
  };
}

describe("Q library SES environment detection", () => {
  it("should properly handle SES environment when ses.ok() returns false", () => {
    // Save the original global.ses if it exists
    const originalSes = (global as any).ses;

    // Mock the SES environment where ses.ok() returns false
    (global as any).ses = {
      ok: () => false,
      makeQ: undefined
    };

    // Force re-evaluation of the Q module in the SES environment context
    // This will trigger the SES branch in the code
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const qInstance = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In the original code, when ses.ok() returns false, it should return early
    // and not set ses.makeQ
    // In the mutated code, when ses.ok() returns false, it would incorrectly
    // proceed to set ses.makeQ
    expect((global as any).ses.makeQ).toBeUndefined();

    // Clean up
    if (originalSes !== undefined) {
      (global as any).ses = originalSes;
    } else {
      delete (global as any).ses;
    }
  });
});