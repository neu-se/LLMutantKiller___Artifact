import { jest } from "@jest/globals";

describe("Q hasStacks mutation", () => {
  it("initial hasStacks value is observable when Error stack access throws", () => {
    jest.resetModules();
    
    const origError = global.Error;
    
    class TrapError extends origError {
      constructor(msg?: string) {
        super(msg);
        // Make stack a getter that throws - so !!e.stack throws
        // causing the catch block to... wait, we're already IN the catch block
        // The try block is: throw new Error()
        // The catch block is: hasStacks = !!e.stack
        // If e.stack throws during access, that exception propagates OUT of the catch
        // and hasStacks retains its initial value!
        Object.defineProperty(this, 'stack', {
          get() { throw new origError("no stack"); },
          configurable: true
        });
      }
    }
    
    (global as any).Error = TrapError;
    
    let freshQ: any;
    try {
      freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      (global as any).Error = origError;
    }
    
    // Original: hasStacks starts false, !!e.stack throws -> hasStacks stays FALSE
    // Mutant:   hasStacks starts true,  !!e.stack throws -> hasStacks stays TRUE
    // NOW THEY DIFFER!
    
    freshQ.longStackSupport = true;
    const deferred = freshQ.defer();
    
    // With hasStacks=false (original): no stack captured on promise
    // With hasStacks=true (mutant): stack captured on promise
    expect(deferred.promise.stack).toBeUndefined();
  });
});