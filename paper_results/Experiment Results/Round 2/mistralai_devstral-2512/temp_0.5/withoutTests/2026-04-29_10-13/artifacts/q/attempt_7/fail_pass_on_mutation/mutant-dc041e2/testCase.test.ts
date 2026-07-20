// Test to detect the mutation in the SES (Secure EcmaScript) environment check
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

declare global {
  var ses: {
    ok: () => boolean;
    makeQ: any;
  };
}

describe("Q library SES environment detection", () => {
  it("should execute different branches based on ses.ok() return value", () => {
    // Test with ses.ok() returning false
    (global as any).ses = {
      ok: () => false,
      makeQ: undefined
    };

    // Track execution flow
    let returnBranchExecuted = false;
    let elseBranchExecuted = false;

    // Monkey-patch the SES environment to track execution
    const originalSes = (global as any).ses;
    (global as any).ses = new Proxy(originalSes, {
      get(target, prop) {
        if (prop === 'ok') {
          return target.ok;
        }
        if (prop === 'makeQ') {
          // This will be called if the else branch executes
          elseBranchExecuted = true;
          return target.makeQ;
        }
        return target[prop];
      },
      set(target, prop, value) {
        if (prop === 'makeQ') {
          elseBranchExecuted = true;
        }
        target[prop] = value;
        return true;
      }
    });

    // Force re-evaluation of the Q module
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    try {
      const qInstance = require("../../../../../../../../../../../subject_repositories/q/q.js");
      // If we reach here, the return branch was executed
      returnBranchExecuted = true;
    } catch (e) {
      // If an error occurs, it means the else branch was executed
      elseBranchExecuted = true;
    }

    // In original code: when ses.ok() returns false, return branch should execute
    // In mutated code: when ses.ok() returns false, else branch would execute
    expect(returnBranchExecuted).toBe(true);
    expect(elseBranchExecuted).toBe(false);

    // Clean up
    delete (global as any).ses;
  });
});