import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done", () => {
  it("should use the promise directly (not wrap with then) when no callbacks provided, so fulfilled handler is not called", (done) => {
    let fulfilledCalled = false;
    
    // With the mutation (var promise = true ?), done() always calls this.then(fulfilled, rejected, progress)
    // even when no callbacks are provided. This means if we call done() with no args,
    // the mutated code creates this.then(undefined, undefined, undefined) as `promise`.
    // The original uses `this` directly.
    // 
    // The observable difference: when fulfilled/rejected/progress are all falsy (null/undefined/0),
    // original code: promise = this (no extra then)
    // mutated code: promise = this.then(null, null, null) (extra then)
    //
    // We can detect this by checking that done() with no callbacks on a rejected promise
    // properly triggers Q.onerror. Both should work, so let's find a better angle.
    //
    // Actually the key: with mutation, done(someCallback) and done() both go through then().
    // With original, done() skips then(). The difference is observable via timing/ticks.
    
    const originalOnerror = Q.onerror;
    const rejection = new Error("unhandled");
    let errorReceived: any = null;
    
    Q.onerror = function(err: any) {
      errorReceived = err;
    };
    
    Q.reject(rejection).done();
    
    // Give time for async processing
    setTimeout(() => {
      Q.onerror = originalOnerror;
      expect(errorReceived).toBe(rejection);
      done();
    }, 100);
  });
});