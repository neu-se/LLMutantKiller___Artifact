import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick scheduling", () => {
  it("does not use setImmediate for scheduling when MessageChannel is available", (done) => {
    if (typeof MessageChannel === "undefined" || typeof setImmediate === "undefined") {
      done();
      return;
    }

    // Warm up to get past the first tick
    Q.nextTick(() => {
      setTimeout(() => {
        const originalSetImmediate = global.setImmediate;
        let setImmediateCallCount = 0;

        (global as any).setImmediate = function (...args: any[]) {
          setImmediateCallCount++;
          return originalSetImmediate.apply(global, args as any);
        };

        Q.nextTick(() => {
          (global as any).setImmediate = originalSetImmediate;
          try {
            // Original: uses MessageChannel, setImmediate NOT called = 0
            // Mutated: uses setImmediate, setImmediate IS called = 1
            expect(setImmediateCallCount).toBe(0);
            done();
          } catch (e) {
            done(e as Error);
          }
        });
      }, 0);
    });
  });
});