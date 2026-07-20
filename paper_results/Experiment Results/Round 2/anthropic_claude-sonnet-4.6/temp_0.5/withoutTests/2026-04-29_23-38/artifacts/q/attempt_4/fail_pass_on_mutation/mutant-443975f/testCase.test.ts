import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q scheduling", () => {
  it("does not call setTimeout when setImmediate is available for scheduling", (done) => {
    const originalSetTimeout = global.setTimeout;
    let setTimeoutCalled = false;
    
    (global as any).setTimeout = function(...args: any[]) {
      setTimeoutCalled = true;
      return originalSetTimeout.apply(this, args);
    };
    
    Q.resolve(42).then((val) => {
      (global as any).setTimeout = originalSetTimeout;
      // Original uses setImmediate (no setTimeout), mutated uses MessageChannel (calls setTimeout on first tick)
      expect(setTimeoutCalled).toBe(false);
      done();
    });
  });
});