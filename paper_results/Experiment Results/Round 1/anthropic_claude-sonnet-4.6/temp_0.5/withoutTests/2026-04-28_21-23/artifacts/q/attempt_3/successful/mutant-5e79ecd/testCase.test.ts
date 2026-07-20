import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not create an intermediate promise when called without callbacks", (done) => {
    const p = Q(42);
    const thenCalls: any[][] = [];
    const origThen = p.then;
    
    // Spy only on this specific promise instance
    (p as any).then = function(...args: any[]) {
      thenCalls.push(args);
      return origThen.apply(this, args);
    };
    
    (p as any).done();
    
    setTimeout(() => {
      // Original: done() with no callbacks -> promise = this -> this.then(void 0, onUnhandledError)
      //   -> 1 call, with second arg being a function (onUnhandledError)
      // Mutation: done() with no callbacks -> promise = this.then(undefined, undefined, undefined)
      //   -> 1 call on p, with all args undefined
      //   -> then newPromise.then(void 0, onUnhandledError) -> called on newPromise, not p
      //   -> still 1 call on p, but second arg is undefined
      
      expect(thenCalls.length).toBe(1);
      // In original, the single call to p.then has onUnhandledError as second arg
      // In mutation, the single call to p.then has undefined as second arg
      expect(typeof thenCalls[0][1]).toBe("function");
      done();
    }, 50);
  });
});