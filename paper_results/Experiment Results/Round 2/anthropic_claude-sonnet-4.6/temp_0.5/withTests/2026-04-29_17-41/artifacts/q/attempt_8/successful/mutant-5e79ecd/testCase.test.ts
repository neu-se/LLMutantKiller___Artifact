import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("done() with no callbacks should attach error handler directly to the promise", () => {
    const Q_any = Q as any;
    Q_any.onerror = function() {};

    const p = Q_any.resolve(42);
    const thenArgs: any[][] = [];
    const originalThen = p.then;

    p.then = function(this: any) {
      thenArgs.push(Array.prototype.slice.call(arguments));
      return originalThen.apply(this, arguments as any);
    };

    p.done();

    Q_any.onerror = null;

    // Original: promise = this (p), then p.then(void 0, onUnhandledError)
    //   -> thenArgs[0][1] is the onUnhandledError function
    // Mutated: promise = this.then(undefined, undefined, undefined)
    //   -> p.then(undefined, undefined, undefined) called
    //   -> thenArgs[0][1] is undefined
    expect(thenArgs.length).toBe(1);
    expect(typeof thenArgs[0][1]).toBe("function");
  });
});