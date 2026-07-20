import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.then done guard", () => {
  it("should resolve to fulfilled value not rejected when both handlers triggered, fulfilled first", (done) => {
    // We need a promise where promiseDispatch:
    // 1. Calls the resolve callback (fulfilled path) synchronously  
    // 2. Then calls operands[1] (rejection path) synchronously
    // The done guard should prevent the rejection from overriding the fulfillment
    
    // Build such a promise using Q.defer and patching
    const d = Q.defer();
    
    // We'll intercept the .then call on the resulting promise
    // by creating a custom promise that misbehaves
    
    // The trick: use a fulfilled promise but patch its promiseDispatch
    // to also invoke the rejection operand
    d.resolve(42);
    
    // Wait for the promise to be resolved, then patch
    const promise = d.promise;
    const origDispatch = (promise as any).promiseDispatch;
    
    // Replace promiseDispatch to call both fulfilled resolve AND rejection operand
    (promise as any).promiseDispatch = function(resolve: any, op: string, operands: any[]) {
      if (op === "when") {
        // First call the normal dispatch (which will call resolve with fulfilled value)
        origDispatch.call(promise, resolve, op, operands);
        // Then synchronously call the rejection operand
        if (operands && operands[1]) {
          operands[1](new Error("spurious rejection"));
        }
      } else {
        origDispatch.call(promise, resolve, op, operands);
      }
    };

    const results: string[] = [];
    
    promise.then(
      function(v: any) { results.push("fulfilled:" + v); },
      function(e: any) { results.push("rejected:" + e.message); }
    ).then(function() {
      try {
        expect(results).toEqual(["fulfilled:42"]);
        done();
      } catch(e) {
        done(e);
      }
    });
  });
});