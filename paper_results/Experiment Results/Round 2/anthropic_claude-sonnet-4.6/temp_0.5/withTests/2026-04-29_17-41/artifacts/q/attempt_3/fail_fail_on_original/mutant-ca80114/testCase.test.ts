describe("runSingle error handling", () => {
  it("in non-Node environment, error from task does not propagate synchronously out of flush", (done) => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];

    const origToString = (process as any).toString;
    (process as any).toString = (): string => "[object Object]";
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    (process as any).toString = origToString;

    const origSetImmediate = global.setImmediate;
    let flushThrewSynchronously = false;

    (global as any).setImmediate = function(fn: Function, ...args: any[]) {
      return origSetImmediate(() => {
        try {
          fn(...args);
        } catch (e) {
          flushThrewSynchronously = true;
        }
      });
    };

    Q.nextTick(() => {
      throw new Error("test error");
    });

    setTimeout(() => {
      (global as any).setImmediate = origSetImmediate;
      // Original (browser path): error wrapped in setTimeout, flush returns normally → false
      // Mutated (Node path): error re-thrown synchronously → flush throws → true
      expect(flushThrewSynchronously).toBe(false);
      done();
    }, 300);
  });
});