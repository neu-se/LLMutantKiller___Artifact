const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick scheduling behavior", () => {
  it("should use setImmediate when available for task scheduling", (done) => {
    const results: string[] = [];
    let qCompleted = false;
    let nativeCompleted = false;

    // Only run this test if setImmediate is available
    if (typeof setImmediate === "function") {
      // Schedule Q.nextTick task
      Q.nextTick(() => {
        results.push("q");
        qCompleted = true;
        if (nativeCompleted) checkOrder();
      });

      // Schedule native setImmediate task
      setImmediate(() => {
        results.push("native");
        nativeCompleted = true;
        if (qCompleted) checkOrder();
      });

      // Timeout to ensure we don't hang
      setTimeout(checkOrder, 100);

      function checkOrder() {
        try {
          const qIndex = results.indexOf("q");
          const nativeIndex = results.indexOf("native");

          // In original code: both use setImmediate (non-deterministic order)
          // In mutated code: Q falls back to MessageChannel/setTimeout (always after native)
          // We expect at least one case where Q executes before native in original
          if (qIndex !== -1 && nativeIndex !== -1) {
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