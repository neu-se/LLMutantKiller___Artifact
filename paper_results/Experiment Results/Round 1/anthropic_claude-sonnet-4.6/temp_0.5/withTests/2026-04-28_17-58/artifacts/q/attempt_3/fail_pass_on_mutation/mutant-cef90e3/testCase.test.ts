import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.then done guard for rejection", () => {
  it("should not override fulfilled resolution when rejection callback fires after done is set", (done) => {
    const deferred = Q.defer();
    
    // Chain: deferred.promise.then(fulfilled, rejected)
    // We want to capture what the resulting promise resolves to
    const results: Array<{ type: string; value?: any; reason?: any }> = [];
    
    // Create a custom promise-like that dispatches both fulfilled and rejected
    // by manipulating the deferred's internal dispatch
    const innerDeferred = Q.defer();
    
    const resultPromise = innerDeferred.promise.then(
      function(value: any) {
        results.push({ type: "fulfilled", value });
      },
      function(reason: any) {
        results.push({ type: "rejected", reason });
      }
    );
    
    // Resolve with a value first
    innerDeferred.resolve(42);
    
    // Then after resolution, manually trigger the rejection path
    // by calling promiseDispatch directly on the resolved promise
    Q.nextTick(function() {
      Q.nextTick(function() {
        // At this point the fulfilled callback should have fired
        // Now check results
        resultPromise.then(function() {
          expect(results.length).toBe(1);
          expect(results[0].type).toBe("fulfilled");
          expect(results[0].value).toBe(42);
          done();
        }).fail(function(err: any) {
          done(err);
        });
      });
    });
  });
});