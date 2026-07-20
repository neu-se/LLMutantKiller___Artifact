import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick scheduling mechanism", () => {
  it("does not call setTimeout on subsequent ticks when MessageChannel is available", (done) => {
    if (typeof MessageChannel === "undefined") {
      done();
      return;
    }

    // First tick to warm up - switches requestTick to pure MessageChannel mode
    Q.nextTick(() => {
      const originalSetTimeout = global.setTimeout;
      let setTimeoutCallCount = 0;

      (global as any).setTimeout = function (...args: any[]) {
        setTimeoutCallCount++;
        return (originalSetTimeout as any).apply(global, args);
      };

      // Schedule next tick - original uses MessageChannel (no setTimeout)
      // mutated uses setTimeout
      Q.nextTick(() => {
        (global as any).setTimeout = originalSetTimeout;
        try {
          expect(setTimeoutCallCount).toBe(0);
          done();
        } catch (e) {
          done(e as Error);
        }
      });
    });
  });
});