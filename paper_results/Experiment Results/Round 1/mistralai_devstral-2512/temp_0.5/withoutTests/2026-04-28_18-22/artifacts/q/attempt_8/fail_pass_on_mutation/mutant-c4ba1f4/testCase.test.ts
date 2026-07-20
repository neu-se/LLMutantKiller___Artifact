const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick scheduling behavior", () => {
  it("should use setImmediate when available for task scheduling", (done) => {
    const results: string[] = [];
    let qTaskCompleted = false;
    let nativeTaskCompleted = false;

    // Only run this test if setImmediate is available
    if (typeof setImmediate === "function") {
      // Schedule a Q.nextTick task
      Q.nextTick(() => {
        results.push("q");
        qTaskCompleted = true;
        if (nativeTaskCompleted) verifyOrder();
      });

      // Schedule a native setImmediate task
      setImmediate(() => {
        results.push("native");
        nativeTaskCompleted = true;
        if (qTaskCompleted) verifyOrder();
      });

      // Timeout to ensure we don't hang
      setTimeout(verifyOrder, 100);

      function verifyOrder() {
        try {
          const qIndex = results.indexOf("q");
          const nativeIndex = results.indexOf("native");

          // In the original code, both use setImmediate so order is non-deterministic
          // In the mutated code, Q falls back to MessageChannel/setTimeout which
          // executes after setImmediate, so native should always come first
          if (nativeIndex !== -1 && qIndex !== -1) {
            expect(qIndex).toBeLessThan(nativeIndex);
          }
          done();
        } catch (e) {
          done(e);
        }
      }
    } else {
      done();
    }
  });
});