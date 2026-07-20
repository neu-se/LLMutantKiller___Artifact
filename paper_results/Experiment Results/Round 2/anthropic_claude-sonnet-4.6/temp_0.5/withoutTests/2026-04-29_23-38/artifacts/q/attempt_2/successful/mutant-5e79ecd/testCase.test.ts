import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should invoke fulfilled callback when provided but not create extra then chain when no callbacks given", async () => {
    // When done() is called with no callbacks:
    // Original: promise = this, then this.then(void 0, onUnhandledError)
    //   => the rejected handler IS a function (onUnhandledError)
    // Mutated: promise = this.then(undefined,undefined,undefined), then promise.then(void 0, onUnhandledError)
    //   => this.then is called with (undefined, undefined, undefined) - rejected handler is undefined

    const p = Q.resolve(42);
    const invocations: any[][] = [];
    const origThen = p.then.bind(p);

    (p as any).then = function (...args: any[]) {
      invocations.push(args.slice());
      return origThen(...args);
    };

    p.done();

    await new Promise<void>(resolve => setTimeout(resolve, 50));

    // Original: invocations[0] = [undefined, onUnhandledError] => [1] is a function
    // Mutated:  invocations[0] = [undefined, undefined, undefined] => [1] is undefined
    expect(invocations.length).toBe(1);
    expect(typeof invocations[0][1]).toBe("function");
  });
});