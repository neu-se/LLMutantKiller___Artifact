describe("Q nextTick scheduler", () => {
  it("uses setImmediate when available in non-Node environment", (done) => {
    jest.resetModules();

    const origToString = process.toString;
    const origMessageChannel = (global as any).MessageChannel;
    const origSetImmediate = (global as any).setImmediate;
    const origSetTimeout = (global as any).setTimeout;

    // Simulate non-Node environment (process exists but toString returns wrong value)
    process.toString = () => "[object Object]";
    // Remove MessageChannel so mutated code falls through to setTimeout
    (global as any).MessageChannel = undefined;

    let setImmediateCalled = false;
    let setTimeoutCalled = false;

    (global as any).setImmediate = (fn: Function) => {
      setImmediateCalled = true;
      return origSetImmediate(fn);
    };

    (global as any).setTimeout = (fn: Function, ms: number) => {
      setTimeoutCalled = true;
      return origSetTimeout(fn, ms);
    };

    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Q2.nextTick(() => {
      process.toString = origToString;
      (global as any).setImmediate = origSetImmediate;
      (global as any).setTimeout = origSetTimeout;
      (global as any).MessageChannel = origMessageChannel;

      // Original: setImmediate branch taken → setImmediateCalled=true, setTimeoutCalled=false
      // Mutated: setImmediate branch skipped → setTimeout used → setTimeoutCalled=true
      expect(setImmediateCalled).toBe(true);
      expect(setTimeoutCalled).toBe(false);
      done();
    });
  });
});