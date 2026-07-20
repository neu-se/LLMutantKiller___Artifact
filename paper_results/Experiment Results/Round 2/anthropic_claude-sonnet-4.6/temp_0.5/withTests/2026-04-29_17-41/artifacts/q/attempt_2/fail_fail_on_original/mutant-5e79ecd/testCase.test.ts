import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should resolve fulfilled callback when done is called with only a fulfilled handler", (done) => {
    const Q_any = Q as any;
    
    // The mutation changes: var promise = fulfilled || rejected || progress ?
    // to: var promise = true ?
    // 
    // Original with no callbacks: promise = this (skip then())
    // Mutated with no callbacks: promise = this.then(undefined, undefined, undefined)
    //
    // When done() is called with no callbacks on a fulfilled promise,
    // original attaches onUnhandledError to `this` (already fulfilled, no error)
    // mutated attaches onUnhandledError to this.then() (new promise, also fulfilled)
    //
    // For FULFILLED with no callbacks: both work fine
    // For REJECTED with no callbacks: 
    //   original: onUnhandledError attached to `this` (rejected) -> fires
    //   mutated: onUnhandledError attached to this.then() (also rejected) -> should also fire
    //
    // So what's actually different? Let me check if the closing brace issue matters...
    // The placeholder is: `    }` - so in original there's a closing brace for the if(process.domain) block
    // In mutated it's: `    var promise = true ?` - which replaces the closing brace!
    // This means in the MUTATED code, `promise.then(void 0, onUnhandledError)` is INSIDE the if block!
    
    // So the real difference: in mutated code, promise.then(void 0, onUnhandledError) only runs
    // when process.domain is set! Without process.domain, onUnhandledError is NEVER attached!
    
    let errorCalled = false;
    Q_any.onerror = function(err: any) {
      errorCalled = true;
    };
    
    // This should trigger onerror in original but NOT in mutated (since process.domain is not set in tests)
    Q_any.reject(new Error("test")).done();
    
    return Q_any.delay(100).then(function() {
      expect(errorCalled).toBe(true);
    });
  });
});