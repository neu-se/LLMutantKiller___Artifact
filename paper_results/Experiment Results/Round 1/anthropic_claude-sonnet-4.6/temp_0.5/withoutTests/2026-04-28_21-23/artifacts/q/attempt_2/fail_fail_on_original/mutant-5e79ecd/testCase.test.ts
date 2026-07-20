import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should untrack the rejection when done() is called without callbacks", async () => {
    Q.resetUnhandledRejections();
    
    const err = new Error("test error");
    const p = Q.reject(err);
    
    // Call done() with no callbacks
    p.done();
    
    await new Promise<void>(resolve => setTimeout(resolve, 100));
    
    // Original: promise = this, then this.then(void 0, onUnhandledError)
    //   => onUnhandledError is truthy, so untrackRejection(this) is called
    //   => unhandledReasons should be empty (or just contain the intermediate promise)
    // 
    // Mutation: promise = this.then(undefined, undefined, undefined)
    //   => this.then() with no rejection handler doesn't untrack `this`
    //   => `this` remains in unhandledRejections
    //   => unhandledReasons will contain the error
    
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(0);
  });
});