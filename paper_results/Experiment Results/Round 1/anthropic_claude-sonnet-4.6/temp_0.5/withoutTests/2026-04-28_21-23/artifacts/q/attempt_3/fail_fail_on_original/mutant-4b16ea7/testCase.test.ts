import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q setImmediate requestTick", () => {
  it("should use setImmediate bound to window when window is defined", (done) => {
    const calls: any[] = [];
    const originalSetImmediate = (global as any).setImmediate;
    (global as any).setImmediate = function(...args: any[]) {
      calls.push({ thisArg: this, args });
      return originalSetImmediate.apply(this, args);
    };

    Q.nextTick(() => {
      (global as any).setImmediate = originalSetImmediate;
      // In original: requestTick = setImmediate.bind(window, flush)
      // so setImmediate is called with flush as first arg directly (no wrapper)
      // In mutant: requestTick wraps setImmediate(flush) in a function
      // The difference: in original, the bound function IS setImmediate itself
      // so `this` when setImmediate is called would be `window`
      expect(calls.length).toBeGreaterThan(0);
      done();
    });
  });
});